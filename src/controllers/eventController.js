import { validationResult } from 'express-validator';
import { Event } from '../models/Event.js';

export async function createEvent(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, datetime, location, description } = req.body;
    const event = await Event.create({
      userId: req.user.id,
      title,
      datetime,
      location,
      description
    });
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}

export async function listEvents(req, res, next) {
  try {
    const { filter } = req.query; // 'upcoming' | 'past' | undefined
    const now = new Date();

    const query = { userId: req.user.id };
    if (filter === 'upcoming') query.datetime = { $gte: now };
    if (filter === 'past') query.datetime = { $lt: now };

    const events = await Event.find(query).sort({ datetime: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

export async function getEvent(req, res, next) {
  try {
    const event = await Event.findOne({ _id: req.params.id, userId: req.user.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function updateEvent(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, datetime, location, description } = req.body;
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, datetime, location, description },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const deleted = await Event.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
}

export async function enableShare(req, res, next) {
  try {
    const event = await Event.findOne({ _id: req.params.id, userId: req.user.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (!event.shareSlug) event.generateShareSlug();
    await event.save();
    res.json({ shareSlug: event.shareSlug });
  } catch (err) {
    next(err);
  }
}

export async function disableShare(req, res, next) {
  try {
    const event = await Event.findOne({ _id: req.params.id, userId: req.user.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    event.shareSlug = undefined;
    await event.save();
    res.json({ message: 'Sharing disabled' });
  } catch (err) {
    next(err);
  }
}

export async function viewShared(req, res, next) {
  try {
    const event = await Event.findOne({ shareSlug: req.params.slug });
    if (!event) return res.status(404).json({ message: 'Shared event not found' });

    // Expire link if event datetime has passed
    if (new Date(event.datetime) < new Date()) {
      return res.status(410).json({ message: 'This shared link has expired' }); // 410 Gone
    }

    res.json({
      title: event.title,
      datetime: event.datetime,
      location: event.location,
      description: event.description
    });
  } catch (err) {
    next(err);
  }
}

