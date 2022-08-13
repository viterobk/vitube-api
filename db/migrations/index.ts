/**
 This file is auto generated. Please do not modify it manually.
 Run "yarn migration <migration name>" to generate a migration and automatically add it to index.js
 */

export default async function () {
    return [
        (await import('./20220812152502_create_users_table')).default,
        (await import('./20220812154004_create_videos_table')).default,
    ]
}