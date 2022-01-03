"use strict";
class Block {
    constructor(p_blockX, p_blockY, p_width, p_height, p_solid, p_img) {
        this.blockX = p_blockX;
        this.blockY = p_blockY;
        this.width = p_width;
        this.height = p_height;
        this.solid = p_solid;
        this.img = p_img;
    }
    getBlockX() {
        return this.blockX;
    }
    getBlockY() {
        return this.blockY;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getSolid() {
        return this.solid;
    }
    getImg() {
        return this.img;
    }
    setBlockX(p_blockX) {
        this.blockX = p_blockX;
    }
    setBlockY(p_blockY) {
        this.blockY = p_blockY;
    }
    setWidth(p_width) {
        this.width = p_width;
    }
    setHeight(p_height) {
        this.height = p_height;
    }
    setsolid(p_solid) {
        this.solid = p_solid;
    }
    setImg(p_img) {
        this.img = p_img;
    }
    getURX() {
        return this.blockX + this.width;
    }
    getURY() {
        return this.blockY;
    }
    getDRX() {
        return this.blockX + this.width;
    }
    getDRY() {
        return this.blockY + this.height;
    }
    getDLX() {
        return this.blockX;
    }
    getDLY() {
        return this.blockY + this.height;
    }
    getULX() {
        return this.blockX;
    }
    getULY() {
        return this.blockY;
    }
}
