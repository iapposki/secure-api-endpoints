import {Request, Response} from 'express';
import {web3} from '../services/ethereum.service'

export const getEthBalance = (req: Request, res: Response) => {
    const {address} = req.query
    web3.eth.getBalance(address as string).then((data) => {
        var balance = web3.utils.fromWei(data, 'ether')
        res.status(200).json({balance: balance })
    }).catch((err: any) => {
        res.status(400).json({msg: "An error occured while fetching balance", error: err})
    })
}
