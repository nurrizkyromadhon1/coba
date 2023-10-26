const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


function TestUser(req, res) {
    let resp = ResponseTemplate(null, 'success', null, 200)
    res.json(resp)
}

async function Insert(req, res) {

    const { username, email, password } = req.body

    const payload = {
        username,
        email,
        password
    }

    try {
        const user = await prisma.user.create({
            data: payload
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Get(req, res) {

    const { username, email, password } = req.query

    const payload = {}

    if (username) {
        payload.username = username
    }

    if (email) {
        payload.email = email
    }
    if (password) {
        payload.email = password
    }

    try {

        const users = await prisma.user.findMany({
            where: payload            
        });

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function GetByPK(req, res) {

    const { id } = req.params

    try {
        const users = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { username, email, password } = req.body
    const { id } = req.params

    const payload = {}

    if (!username && !email && !password) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (username) {
        payload.username = username
    }

    if (email) {
        payload.email = email
    }

    if (password) {
        payload.password = password
    }


    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { id } = req.params

    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}






module.exports = {
    TestUser,
    Insert,
    Get,
    GetByPK,
    Update,
    Delete
}