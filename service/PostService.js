const {User} = require('../model/User');
const {Post} = require('../model/Post');

/**
 * Find One Model
 * @param model
 * @param id
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
const findOneModel = async (model, id) => {
    return await model.findOne({
        attributes: {exclude: ['password', 'role']},
        where: {
            id: id,
        },
    });
}


/**
 * Create Post
 * @param titlePost
 * @param contentPost
 * @param posterPost
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
const createPost = async (titlePost, contentPost, posterPost) => {
    let result = await Post.findOrCreate({
        where: {
            title: titlePost,
            content: contentPost,
            poster: posterPost,
        }
    });
    return result[0];
}

/**
 * Get Post
 * @param postId
 * @returns {Promise<null|{post: *, poster: null}>}
 */
const getPost = async (postId) => {
    let getPost = await findOneModel(Post, postId);
    if (!getPost) {
        return null;
    }
    let getUser = null;
    if (!!getPost) {
        getUser = await findOneModel(User, getPost.poster);
    }
    return {
        post: getPost,
        poster: getUser,
    }
}

/**
 * Update Post
 * @param postId
 * @param titlePost
 * @param contentPost
 * @param posterPost
 * @returns {Promise<null|Model<*, TModelAttributes>>}
 */
const updatePost = async (postId, titlePost, contentPost, posterPost) => {
    let getPost = await findOneModel(Post, postId);
    if (!getPost) {
        return null;
    }
    await Post.update({
        title: titlePost,
        content: contentPost,
        poster: posterPost,
    }, {
        where: {
            id: postId
        }
    })
    let rs = await findOneModel(Post, postId);
    return rs;
}

/**
 * Delete Post for Id
 * @param postId
 * @returns {Promise<{}|null>}
 */
const deletePost = async (postId) => {
    let getPost = await findOneModel(Post, postId);
    if (!getPost) {
        return null;
    }
    await Post.destroy({
        where: {
            id: postId
        }
    });
    return {}
}

module.exports = {
    deletePost,
    updatePost,
    getPost,
    findOneModel,
    createPost
}