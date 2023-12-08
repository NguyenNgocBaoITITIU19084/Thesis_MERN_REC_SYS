const mongoose = require("mongoose");

const { ROLE } = require("../contants/role");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      minlength: [3, "email must be greater than 3 letters"],
      maxlength: [30, "email must be less than 30 letters"],
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [9, "password must be greater than 9 letters"],
      maxlength: [30, "password must be less than 30 letters"],
      required: [true, "password is required"],
    },
    roles: {
      type: [String],
      enum: ROLE,
      default: ROLE.GUEST,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refesh_token: {
      type: String,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "profiles",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  }
});

module.exports = mongoose.model("users", UserSchema);
