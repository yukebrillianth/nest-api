import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookmarkDto, EditBookmarkDto } from "./dto";

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) { }

    async getBookmarks(userId: number) {
        const bookmarks = await this.prisma.bookmark.findMany({
            where: {
                userId
            }
        });

        return {
            success: true,
            message: "Success get all bookmarks!",
            data: bookmarks
        };
    }

    async createBookmark(userId: number, dto: CreateBookmarkDto) {
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })

        return {
            success: true,
            message: "Success create new bookmark!",
            data: bookmark
        };
    }

    async getBookmarkById(userId: number, bookmarkId: number) {
        const bookmark = await this.prisma.bookmark.findFirst({
            where: {
                userId,
                id: bookmarkId
            }
        });

        return {
            success: true,
            message: "Success get bookmark by id!",
            data: bookmark
        };
    }

    async editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        // get bookmark by id
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });

        // check if user owns the bookmark
        if (!bookmark || bookmark.userId !== userId)
            throw new ForbiddenException('Access to resource denied!');

        const bookmarkUpdated = await this.prisma.bookmark.update({
            where: {
                id: bookmarkId,
            },
            data: {
                ...dto
            },
        });

        return {
            success: true,
            message: "Success edit the bookmark!",
            data: bookmarkUpdated
        };
    }

    async deleteBookmarkById(userId: number, bookmarkId: number) {
        // get bookmark by id
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });

        // check if user owns the bookmark
        if (!bookmark || bookmark.userId !== userId)
            throw new ForbiddenException('Access to resource denied!');

        await this.prisma.bookmark.delete({
            where: {
                id: bookmarkId,
            }
        });
    }
}