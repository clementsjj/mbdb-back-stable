var Bathroom = require('../model/bathroomModel');

module.exports = {
  findValidatedBathrooms: (req, res) => {
    Bathroom.find({ isValidated: true })
      .then(bathrooms => {
        let success = {};
        success.confirmation = true;
        success.payload = bathrooms;
        res.json(bathrooms);
      })
      .catch(err => {
        res.json(err);
      });
  },

  findNonValidatedBathrooms: (req, res) => {
    Bathroom.find({ isValidated: false })
      .then(bathrooms => {
        let success = {};
        success.confirmation = true;
        success.payload = bathrooms;
        res.json(bathrooms);
      })
      .catch(err => {
        res.json(err);
      });
  },

  deleteBathroom: params => {
    return new Promise((resolve, reject) => {
      Bathroom.findByIdAndRemove(params._id)
        .then(() => {
          let success = {};
          success.confirmation = true;
          //res.json(success);
          resolve(success);
        })
        .catch(err => {
          //res.json(err);
          reject(err);
        });
    });
  },

  findAllBathrooms: (req, res) => {
    Bathroom.find({})
      .then(bathrooms => {
        let success = {};
        success.confirmation = true;
        success.payload = bathrooms;
        res.json(bathrooms);
      })
      .catch(err => {
        res.json(err);
      });
  },

  editBathroom: params => {
    return new Promise((resolve, reject) => {
      Bathroom.findOneAndUpdate({ _id: params._id }, params).then(
        updatedBathroom => {
          resolve(updatedBathroom);
        }
      );
    });
  },

  addAdditionalCode: params => {
    console.log(params);
    // return new promise((resolve, reject) => {
    Bathroom.findById(params._id)
      .then(data => {
        data.otherCodes.push(params.codes);
        console.log('NewData = ', data);
        //resolve(data);
      })
      .save();
    //  .catch(err => reject(err));
    //});
  },

  addBathroom: params => {
    let latitude = params.lat;
    let longitude = params.lng;
    return new Promise((resolve, reject) => {
      Bathroom.findOne({ place_id: params.place_id })
        .then(bathroom => {
          if (bathroom) {
            let errors = {};
            errors.code = 'Bathroom Already Exists';
            errors.status = 400;
            reject(errors);
          } else {
            const newBathroom = new Bathroom({
              place_id: params.place_id,
              name: params.name,
              address: params.address,
              lat: latitude,
              lng: longitude,
              code: params.code,
              isPublic: params.isPublic,
              quality: params.quality
            });

            newBathroom
              .save()
              .then(newBathroom => resolve(newBathroom))
              .catch(err => reject(err));
          } //end else
        })
        .catch(err => {
          reject(err);
        });
    });
  } //end addBathroom
}; //module exports
