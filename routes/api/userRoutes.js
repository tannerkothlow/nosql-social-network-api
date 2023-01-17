const router = require('express').Router();
const { User, Thought } = require('../../models');

// TODO: Refactor error handling, mongoose seems to have its own form of error catching
// that goes right to catch(err).

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const oneUser = await User.find({ _id: req.params.userId });
        res.status(200).json(oneUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email
        });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const updateUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (updateUser) {
            res.status(200).json(updateUser);
        } else {
            res.status(404).json({ message: `No user found with an ID of ${req.params.userId}` })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const deleteUser = await User.findOneAndRemove(
            { _id: req.params.userId}
        );
        if (deleteUser) {
            const deleteUserPost = await Thought.deleteMany(
                { userId: req.params.userId }
            );
            res.status(200).json({ message: `User with ID of ${req.params.userId} deleted.`})
        } else {
            res.status(404).json({ message: `No user found with an ID of ${req.params.userId}`})
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: Add checks to prevent an already friended user from being added to the
// friends array again.

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const checkFriend = await User.findOne(
            { _id: req.params.friendId }
        );
        if (!checkFriend) {
            res.status(404).json({ message: `No user found with ID ${req.params.friendId} to add to friend list!`});
        };

        const addFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        if (addFriend) {
            res.status(200).json({ message: `User ${req.params.friendId} added to user ${req.params.userId} friend list.`})
        }
    } catch (err) {
        res.status(500).json(err);
    }
}); 

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const checkFriend = await User.findOne(
            { _id: req.params.friendId }
        );
        if (!checkFriend) {
            res.status(404).json({ message: `No user found with ID ${req.params.friendId} to add to friend list!`});
        };

        const removeFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        if (removeFriend) {
            res.status(200).json({ message: `Friend with ID of ${req.params.friendId} removed from User ${req.params.userId} friend list.`})
        }
    } catch (err) {
        res.status(500).json(err);
    }
}); 


module.exports = router;