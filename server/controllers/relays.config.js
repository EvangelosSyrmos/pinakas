const Relay = require("../models/relay.model");
const rpio = require("rpio");
const e = require("express");
const { update } = require("../models/relay.model");

// @desc Get all relays
// @rotue GET /api/v1/relays
exports.getRelays = async (req, res, next) => {
  const relays = await Relay.find();
  res.status(200).json({
    success: true,
    data: relays,
  });
};

// @desc Create new relay
// @route POST /api/v1/relays
exports.createRelay = async (req, res, next) => {
  try {
    var relay = await Relay.create(req.body);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create relay",
      err: err,
    });
  }
  res.status(201).json({
    success: true,
    data: relay,
  });
};

// @desc Get relay by id
// @route GET /api/v1/relays/:id
exports.getOneRelay = async (req, res, next) => {
  try {
    await Relay.findOne(req.body).exec((err, relay) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: `Relay not found with place :${req.body.place}`,
        });
        return;
      }
      if (!relay) {
        res.status(404).json({
          success: false,
          message: "Relay not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: relay,
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Failed to find relay`,
      err: err,
    });
  }
};

// @desc Update relay
// @route PATCH /api/v1/relays/:id
exports.updateRelay = async (req, res, next) => {
  try {
    await Relay.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec((err, relay) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: `Error on fetching relay with ${req.params.id}`,
        });
        return;
      }

      if (!relay) {
        res.status(404).json({
          success: false,
          message: "Relay not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: relay,
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Failed to update relay`,
      err: err,
    });
  }
};

// @desc On/Off Relay
// @route PATCH /api/v1/relays/onoff/:id
exports.onOffRelay = async (req, res, next) => {
  try {
    var relay = await Relay.findById(req.params.id).exec((err, relay) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: `Relay not found with place :${req.body.id}`,
        });
        return;
      }

      if (!relay) {
        res.status(404).json({
          success: false,
          message: "Relay not found",
        });
      } else {
        const updates = Object.keys(req.body);
        const allowedUpdates = ["state"];
        const isValidOperation = updates.every((update) => {
          allowedUpdates.includes(update);
        });

        // if (isValidOperation) {
        //   return res.status(400).json({
        //     message: "Invalid operation",
        //   });
        // }

        updates.forEach((update) => (relay[update] = req.body[update]));
        let updatedRelay = relay.save();

        //   Initialize pin as output and state = false
        rpio.open(relay.pin, rpio.OUTPUT, rpio.HIGH);

        /*
            If state = TRUE => relay = ON
            Else relay = OFF
          */
        const visibility = relay.state ? rpio.LOW : rpio.HIGH;
        rpio.write(relay.pin, visibility);

        res.status(200).json({
          success: true,
          data: updatedRelay,
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Failed to update relay`,
      err: err,
    });
  }
};

// @desc Delete Relay
// @route DELETE /api/v1/relays/:id
exports.deleteRelay = async (req, res, next) => {
  const relay = await Relay.findByIdAndDelete(req.params.id);

  if (!relay) {
    return res.status(404).json({
      message: `Relay not found with id of: ${req.params.id}`,
    });
  }

  res.status(200).json({
    success: true,
    data: {},
  });
};
