from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from surprise import Dataset, Reader, SVD

app = Flask(__name__)

# Content-based Filtering setup
df_content = pd.read_csv('./amazon.csv')
df_content['about_product'] = df_content['about_product'].fillna('')
df_content['about_product'] = df_content['about_product'].str.lower()

tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df_content['about_product'])
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

def get_content_recommendations(product_name, num_recommendations=5):
    idx = df_content.index[df_content['product_name'] == product_name].tolist()
    if not idx:
        return ["Sản phẩm không tìm thấy."]
    idx = idx[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:num_recommendations+1]
    product_indices = [i[0] for i in sim_scores]
    return df_content['product_name'].iloc[product_indices].tolist()

# Collaborative Filtering setup
def recommend_collaborative(user_id, n=5):
    df_collaborative = pd.read_csv('./amazon.csv')
    processed_rows = []
    for index, row in df_collaborative.iterrows():
        user_ids = str(row['user_id']).split(',')
        for uid in user_ids:
            processed_rows.append([uid, row['product_id'], row['rating']])
    new_df = pd.DataFrame(processed_rows, columns=['user_id', 'product_id', 'rating'])
    new_df['rating'] = pd.to_numeric(new_df['rating'], errors='coerce')
    new_df.dropna(inplace=True)
    product_id_to_name = df_collaborative.set_index('product_id')['product_name'].to_dict()

    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(new_df[['user_id', 'product_id', 'rating']], reader)
    trainset = data.build_full_trainset()
    algo = SVD()
    algo.fit(trainset)

    product_ids = df_collaborative['product_id'].unique()
    predictions = [algo.predict(user_id, iid) for iid in product_ids]
    top_n = sorted(predictions, key=lambda x: x.est, reverse=True)[:n]
    return [(product_id_to_name.get(pred.iid, "Unknown Product"), df_collaborative[df_collaborative['product_id'] == pred.iid]['img_link'].iloc[0]) for pred in top_n]

@app.route('/recommend/content', methods=['GET'])
def content_recommend():
    product_name = request.args.get('product_name')
    if not product_name:
        return jsonify({'error': 'Product name is required'}), 400
    recommendations = get_content_recommendations(product_name)
    return jsonify({'recommendations': recommendations})

@app.route('/recommend/collaborative', methods=['GET'])
def collaborative_recommend():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    recommendations = recommend_collaborative(user_id)
    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
