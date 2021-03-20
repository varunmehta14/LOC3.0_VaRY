const Destination=require('../models/destination-model');
var config=require('../config');

createDestination=(req,res)=>{
    const body=req.body;
    if(!body){
        return res.status(400).json({
            success:false,
            error:'You must provide a destination',
        })
    }
    const destination=new Destination(body);
    if (!destination) {
        return res.status(400).json({ success: false, error: err })
    }
    destination
    .save()
    .then(() => {
        return res.status(201).json({
            success: true,
            id: destination._id,
            message: 'destination created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'destination not created!',
        })
    })

}
updateDestination=async(req,res)=>{
    const body=req.body;
    if(!body){
        return res.status(400).json({
            success:false,
            error:'You must provide a body to update',
        })
    }
    Destination.findOne({ _id: req.params.id }, (err, destination) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'destination not found!',
            })
        }
        destination.country = body.country
        destination.name = body.name
        destination.description = body.description
        destination.currency = body.currency
        destination.images = body.images
        destination.attractions = body.attractions
        destination.languages=body.languages

        destination
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: destination._id,
                    message: 'destination updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'destination not updated!',
                })
            })
    })

}

deleteDestination = async (req, res) => {
    await Destination.findOneAndDelete({ _id: req.params.id }, (err, destination) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!destination) {
            return res
                .status(404)
                .json({ success: false, error: `destination not found` })
        }

        return res.status(200).json({ success: true, data: destination })
    }).catch(err => console.log(err))
}

getDestinations = async (req, res) => {
    await Destination.find({}, (err, destinations) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!destinations.length) {
            return res
                .status(404)
                .json({ success: false, error: `destinations not found` })
        }
        return res.status(200).json({ success: true, data: destinations })
    }).catch(err => console.log(err))
}

getDestinationById = async (req, res) => {
    await Destination.findOne({ _id: req.params.id }, (err, destination) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!destination) {
            return res
                .status(404)
                .json({ success: false, error: `Destination not found` })
        }
        return res.status(200).json({ success: true, data: destination })
    }).catch(err => console.log(err))
}

module.exports={
    createDestination,
    updateDestination,
    deleteDestination,
    getDestinations,
    getDestinationById
}