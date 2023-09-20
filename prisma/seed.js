const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')


const users = [
    { 
        username: "Shaheer",
        password: "shaheer123"
    },
    {
        username: "Malik",
        password: "malik123"
    },
    {
        username: "Tyler",
        password: "tyler123"
    }
]

const posts = [
    {
        title: "Post #1",
        content: "Description of post #1",
        userId: 1
    },
    {
        title: "Post #2",
        content: "Description of post #2",
        userId: 1
    },
    {
        title: "Post #3",
        content: "Description of post #3",
        userId: 1
    },
    {
        title: "Post #1",
        content: "Description of post #1",
        userId: 2
    },
    {
        title: "Post #2",
        content: "Description of post #2",
        userId: 2
    },
    {
        title: "Post #3",
        content: "Description of post #3",
        userId: 2
    },
    {
        title: "Post #1",
        content: "Description of post #1",
        userId: 3
    },
    {
        title: "Post #2",
        content: "Description of post #2",
        userId: 3
    },
    {
        title: "Post #3",
        content: "Description of post #3",
        userId: 3
    }
]

async function main() {
    salt_rounds = 5;
    await Promise.all(
       users.map( async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, salt_rounds)
            return prisma.user.create({
                data: {
                    username: user.username,
                    password: hashedPassword
                }
            })
        }),
        posts.map(async (post) => {
            return prisma.post.create({
                data: {
                    title: post.title,
                    content: post.content,
                    userId: post.userId
                }
            })
        }
    ))
    

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })