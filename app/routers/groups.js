const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const GroupMessage = require('../models/groupMembers');

router.post('/create', async (req, res) => {
  const { name, description } = req.body;
  const group = new Group({
    name,
    description,
  });
  await group.save();
  res.json(group);
});

router.delete('/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({ message: 'Group not found' });
  }
  await group.deleteOne();
  res.json({ message: 'Group deleted successfully' });
});


router.get('/groups', async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

router.post('/:groupId/members', async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({ message: 'Group not found' });
  }
  group.members.push(userId);
  await group.save();
  res.json(group);
});

router.post('/:groupId/messages', async (req, res) => {
    const { groupId } = req.params;
    const { userId, content } = req.body;
    const message = new GroupMessage({
    groupId,
    userId,
    content,
    });

    await message.save();
    res.json(message);
});
    
router.post('/:groupId/messages/:messageId/like', async (req, res) => {
    const { groupId, messageId } = req.params;
    const { userId } = req.body;
    const message = await GroupMessage.findById(messageId);
    if (!message || message.groupId.toString() !== groupId) {
    return res.status(404).json({ message: 'Message not found' });
    }
    if (message.likes.includes(userId)) {
    return res.status(400).json({ message: 'User already liked this message' });
    }
    message.likes.push(userId);
    await message.save();
    res.json(message);
});
    
module.exports = router;