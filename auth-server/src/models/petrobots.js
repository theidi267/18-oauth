'use strict';

import mongoose from 'mongoose';

require('mongoose-schema-jsonschema')(mongoose);

import Users from '../auth/model.js';

const petrobotSchema = mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, uppercase: true, required: true },
  legs: { type: Number, default: '4' },
  skills: { type: String, uppercase: true, default: 'PURR' },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

petrobotSchema.pre('findOne', function (next) {
  this.populate('userid');
  next();
});

petrobotSchema.pre('save', function (next) {
  let petid = this._id;
  let userid = this.userid;

  Users.findById(userid)
    .then(user => {
      if (!user) {
        return Promise.reject('Invalid Team Specified');
      } else {
        Users.findOneAndUpdate(
          { _id: userid },
          { $addToSet: { pets: petid } }
        )
          .then(Promise.resolve())
          .catch(err => Promise.reject(err));
      }
    })
    .then(next())
    .catch(next);
});

export default mongoose.model('petrobots', petrobotSchema);
