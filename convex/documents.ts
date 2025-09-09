import {mutation, query} from "./_generated/server";
import {v} from "convex/values"
import {Id} from "./_generated/dataModel";

export const getDocuments = query({
    args: {
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) =>
                q.eq("userId", userId).eq("parentDocument", args.parentDocument),
            )
            .filter((q) => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect()

        return documents
    }
})

export const getSearchDocuments = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject
        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect();

        return documents;
    }
})

export const getDocumentById = query({
    args: {
        documentId: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        const document = await ctx.db.get(args.documentId)

        if (!document) {
            return null
        }

        if (document.isPublished && !document.isArchived) {
            return document
        }

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject
        if (document.userId !== userId) {
            throw new Error("Not Authorized")
        }

        return document
    }
})

export const getTrashDocuments = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        return ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isArchived"), true))
            .order("desc")
            .collect()
    }
})

export const createDocument = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        return await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId: userId as string,
            isArchived: false,
            isPublished: false,
        })
    }
})

export const updateDocument = mutation({
    args: {
        id: v.id("documents"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        const {id, ...rest} = args;

        const existingDocument = await ctx.db.get(id)

        if (!existingDocument) {
            throw new Error("Document not found")
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Not authorized")
        }

        return await ctx.db.patch(args.id, {
            ...rest
        })
    }
})

export const archiveDocument = mutation(({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        const existingDocument = await ctx.db.get(args.id)

        if (existingDocument?.userId !== userId) {
            throw new Error("Not authorized")
        }

        const recursiveArchive = async (documentId: Id<"documents">) => {
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (q) =>
                    q.eq("userId", userId).eq("parentDocument", documentId)
                )
                .collect()

            for (const child of children) {
                await ctx.db.patch(child._id, {isArchived: true})

                await recursiveArchive(child._id)
            }
        }

        const document = await ctx.db.patch(args.id, {
            isArchived: true
        })

        await recursiveArchive(args.id)

        return document
    }
}))


export const restoreDocument = mutation({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Document not found")
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Not authorized")
        }

        const recursiveRestore = async (documentId: Id<"documents">) => {
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent",
                    (q) =>
                        q.eq("userId", userId).eq("parentDocument", documentId))
                .collect()

            for (const child of children) {
                await ctx.db.patch(child._id, {isArchived: false})

                await recursiveRestore(child._id)
            }
        }

        const document = await ctx.db.patch(args.id, {isArchived: false})

        await recursiveRestore(args.id)
        return document
    }
})

export const removeCoverImage = mutation({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Document not found")
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Not authorized")
        }

        return await ctx.db.patch(args.id, {
            coverImage: undefined
        })
    }
})

export const removeDocument = mutation({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Document not found")
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Not authorized")
        }

        return await ctx.db.delete(args.id)
    }
})

export const deleteAllDocuments = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        const documents = await ctx.db.query("documents")
            .withIndex("by_user", (q) =>
                q.eq("userId", userId)
            )
            .collect()

        return await Promise.all(
            documents.map(doc => ctx.db.delete(doc._id))
        )
    }
})