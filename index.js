/**************************************************
 File: index.js
 Name: index
 Explain: index
****************************************By QQBoxy*/
/*jshint node: true, esversion: 6, browser: true*/
import MD5 from 'crypto-js/md5';
import SHA256 from 'crypto-js/sha256';

class NodeShorten {
    constructor() {
        this.base = 32;
        this.shorten = this.shorten.bind(this);
    }
    // Entry Point
    shorten(url, params) {
        if(params) {
            if (params.base) this.base = params.base;
        }
        return this.base == 64 ? this.shortUrl64(url) : this.shortUrl32(url);
    }
    // Base 32
    shortUrl32(url) {
        // 排除相似字 01OI // 共 32 個字
        const _alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        const _base = _alphabet.length - 1;
        const hash = MD5(url).toString();
        let i = 0;
        let j = 0;
        let codes = [];
        // 生成的 32 個位數，使用 8位數 x 4組 = 32 位數
        for (i = 0; i < 4; i++) {
            const sub = hash.substr(8 * i, 8);
            // 32 個位元，僅使用 30 個位元
            let hex = 0x3fffffff & parseInt(sub, 16);
            let code = '';
            for (j = 0; j < 6; j++) {
                const num = _base & hex;
                code += _alphabet[num];
                hex = hex >> 5;
            }
            codes.push(code);
        }
        return codes;
    }
    // Base64
    shortUrl64(url) {
        const pattern = /[!*-._~]/g;
        // 共 64 個字
        // const _alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
        // 排除相似字 01lO // 共 64 個字
        const _alphabet = "23456789abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ!*-._~";
        const hash = SHA256(url).toString();
        let i = 0;
        let j = 0;
        let codes = [];
        // 生成的 64 個位數，僅使用 9位數 x 7組 = 63 位數
        for (i = 0; i < 7; i++) {
            const sub = hash.substr(9 * i, 9);
            // 64 個位元完全使用
            let hex = parseInt(sub, 16);
            let code = '';
            for (j = 0; j < 6; j++) {
                const num = 0x3f & hex;
                code += _alphabet[num];
                hex = hex >> 6;
            }
            codes.push(code);
        }
        // 優先排序無符號的字串
        codes.sort((a, b) => {
            const matchA = a.match(pattern);
            const scoreA = matchA ? matchA.length : 0;
            const matchB = b.match(pattern);
            const scoreB = matchB ? matchB.length : 0;
            return scoreA - scoreB;
        });
        return codes;
    }
}
const nodeshorten = new NodeShorten();
export default nodeshorten.shorten;