const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


/**
 * @swagger
 * /posts:
 *   get:
 *      description: Use to get all posts
 *      responses:
 *          '200':
 *              description: A successful response
 */

router.get('/', async (req, res) =>{
    try {
        const posts = await Post.find();
        res.json(posts);    
    }catch(err){
        res.json({message: err});
    }
});

router.post('/', async (req, res) =>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }
    catch(err)
    {
        res.json({message: err});
    }
    
});


router.get('/:postid', async(req, res) =>{
    try{
        const post =  await Post.findById(req.params.postid);
        res.json(post);
    }
    catch(err)
    {
        res.json({message: err});
    }
});

router.delete('/:postid', async (req, res)=>{
    
    try{
        const post = await Post.remove({_id: req.params.postid});
        res.json(post);
    }
    catch(err)
    {
        res.json({message: err});
    }
});

router.patch('/:postid', async (req, res)=>{
    try{
        const post = await Post.updateOne({_id: req.params.postid}, {$set: {title: req.body.title}});
        res.json(post);
    }
    catch(err)
    {
        res.json({message: err});
    }
});

module.exports = router;