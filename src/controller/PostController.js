const express = require('express');
const router = new express.Router();
const {
    getPost,
    createPost,
    deletePost,
    updatePost
} = require('../service/PostService');
const {postValidator} = require('../validate/PostValidator');

/**
 * Create Post
 */
router.post('', async (req, res) => {
    try {
        let titlePost = req.body.title;
        let contentPost = req.body.content;
        let posterPost = req.body.poster;

        let validator = await postValidator(req);
        if (!!validator) return res.send({message: validator});
        let rs = await createPost(titlePost, contentPost, posterPost);
        return res.send({
            message: 'Create Post successfully!',
            data: rs,
        })
    } catch (err) {
        return res.status(500).send({message: 'Server Error!'})
    }
});
/**
 * Get Post
 */
router.get("/:postId", async (req, res) => {
    try {
        let postId = req.params.postId;
        let result = await getPost(postId);
        if (!result) return res.status(404).send({message: 'Not found Post'});
        return res.send({result})
    } catch (err) {
        return res.status(500).send('Server Error !');
    }
});

/**
 * Update
 */
router.put(":/postId", async (req, res) => {
    try {
        let postId = req.params;
        let titlePost = req.body.title;
        let contentPost = req.body.content;
        let posterPost = req.body.poster;
        if (postId) {
            let result = await updatePost(postId, titlePost, contentPost, posterPost);
            if (!result) return res.status(404).send({message: 'Not Found Post'})
            return res.send({message: 'Update successfully !'})
        }
    } catch (err) {
        return res.status(500).send({message: 'Server Error !'})
    }
});

/**
 * Delete Post
 */
router.delete(":/postId", async (req, res) => {
    try {
        let postId = req.params;
        if (postId) {
            let result = await deletePost(postId);
            return res.status(200).send({message: 'Delete Post successfully !', data: result});
        }
    } catch (err) {
        return res.status(500).send({message: 'Server Error !'})
    }
})

module.exports = router;