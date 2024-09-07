// This file manages the logic for handling request and interaction with db models. ie: deleting, updating, creating, getting

const Trip = require('../models/tripModel');

const trip_index = (req, res) => {
    Trip.find().sort({ lastEdited: -1 }) 
    .then((result) => {
        res.json({ trips: result });
    })
    .catch((err) => {
        console.log(err);
    });
}

const trip_details = (req, res) => {
    const id = req.params.id;
    Trip.findById(id)
        .then(result => {
            res.json({ trip: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

const trip_create_post = (req, res) => {
    const trip = new Trip(req.body);

    trip.save()
        .then((result) => {
            res.json({ trip: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

const trip_delete = (req, res) => {
    const id = req.params.id;

    Trip.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/' });
        })
        .catch((err) => {
            console.log(err);
        });
}

const trip_update = (req, res) => {
    const id = req.params.id;
    const updatedData = {
        ...req.body,
        lastEdited: new Date(), 
    };

    Trip.findByIdAndUpdate(id, updatedData, { new: true })
        .then((result) => {
            res.json({ trip: result });
        })
        .catch((err) => {
            console.log(err);
        });
}


module.exports = {
    trip_index,
    trip_details,
    trip_create_post,
    trip_delete,
    trip_update
}