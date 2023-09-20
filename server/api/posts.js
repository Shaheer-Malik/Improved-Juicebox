const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

router.get("/posts/:id", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  res.json(post);
});

router.post("/posts", async (req, res) => {
  if (!req.user) return res.status(401).send('Unauthorized');
  const { title, content } = req.body;
  const newPost = await prisma.post.create({
    data: { title, content, userId: req.user.id }
  });
  res.status(201).json(newPost);
});

router.put("/posts/:id", async (req, res) => {
  if (!req.user) return res.status(401).send('Unauthorized');
  const { title, content } = req.body;
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(req.params.id) },
    data: { title, content }
  });
  res.json(updatedPost);
});

router.delete("/posts/:id", async (req, res) => {
  if (!req.user) return res.status(401).send('Unauthorized');
  const deletedPost = await prisma.post.delete({
    where: { id: parseInt(req.params.id) }
  });
  res.json(deletedPost);
});

module.exports = router;