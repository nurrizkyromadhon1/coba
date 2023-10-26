const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


function TestProfil(req, res) {
    let resp = ResponseTemplate(null, 'success', null, 200)
    res.json(resp)
}

async function Insert(req, res) {

    const { userId, identity_type, identity_number, address } = req.body

    const payload = {
        userId,
        identity_type,
        identity_number,
        address
    }

    try {
        const profile = await prisma.profile.create({
            data: payload
        })

        let resp = ResponseTemplate(profile, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Get(req, res) {

    const { userId, identity_type, identity_number, address } = req.query

    const payload = {}

    if (userId) {
        payload.userId = userId
    }

    if (identity_type) {
        payload.identity_type = identity_type
    }
    if (identity_number) {
        payload.identity_number = identity_number
    }
    if (address) {
        payload.address = address
    }

    try {

        const profile = await prisma.profile.findMany({
            where: payload            
        });

        let resp = ResponseTemplate(profile, 'success', null, 200)
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
        const profile = await prisma.profile.findUnique({
            where: {
                userId: Number(id)
            },
            include: {
                user: true,
            },
        })

        let resp = ResponseTemplate(profile, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { userId, identity_type, identity_number, address } = req.body
    const { id } = req.params

    const payload = {}

    if (!userId && !identity_type && !identity_number && !address) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (userId) {
        payload.userId = userId
    }

    if (identity_type) {
        payload.identity_type = identity_type
    }
    if (identity_number) {
        payload.identity_number = identity_number
    }
    if (address) {
        payload.address = address
    }


    try {
        const profile = await prisma.profile.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(profile, 'success', null, 200)
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
        const profile = await prisma.profile.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(profile, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}






module.exports = {
    TestProfil,
    Insert,
    Get,
    GetByPK,
    Update,
    Delete
}