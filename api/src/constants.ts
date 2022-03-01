export const PAGE_SIZE: number = 20
export const DEFAULT_LABELS: string[] = ['FEATURE REQUESTS', 'SUGGESTIONS', 'HELP', 'ISSUEs']
export const NEW_ISSUE = 'NEW_ISSUE'
export const NEW_COMMENT = 'NEW_COMMENT'
export const STATUSES: any = {
    OPEN: 'OPEN',
    FLAGGED: 'FLAGGED',
    LATER: 'LATER',
    CLOSED: 'CLOSED',
}
export const API_LOCAL = 'http://localhost:5000'
export const API_LIVE = 'https://api.noom.app'
export const INTERNAL_NOOM_MESSAGE = 'INTERNAL_NOOM_MESSAGE'
export const NOOM_SYSTEM = 'NOOM_SYSTEM'
export const DEFAULT_SETTINGS = {
    actions: {
        features: true,
        bugs: true,
        general: true,
    },
    shortcuts: {
        record: true,
        draw: true,
        file: true,
        email: true,
        subsmissions: true,
    },
    resources: '',
}
export const ACTION = {
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    CREATE: 'CREATE',
    DELETE_COMMENT: 'DELETE_COMMENT',
    CREATE_COMMENT: 'CREATE_COMMENT',
    UPDATE_ASSIGNED: 'UPDATE_ASSIGNED',
    UPDATE_TYPE: 'UPDATE_TYPE',
    UPDATE_TITLE: 'UPDATE_TITLE',
    UPDATE_ATTACHMENTS: 'UPDATE_ATTACHMENTS',
    UPDATE_READ: 'UPDATE_READ',
    UPDATE_COMPLETED: 'UPDATE_COMPLETED',
    UPDATE_NAME_AND_SETTINGS: 'UPDATE_NAME_AND_SETTINGS',
}
export const TOPIC = {
    NOTIFICATION: 'NOTIFICATION',
    ATTACHMENT: 'ATTACHMENT',
    INBOX: 'INBOX',
    LABEL: 'LABEL',
    ISSUE: 'ISSUE',
    COMMENT: 'COMMENT',
    ATTACHMENT_COMMENT: 'ATTACHMENT_COMMENT',
    USER: 'USER',
    WIDGET: 'WIDGET',
    TAB_VISIBILITY: 'TAB_VISIBILITY',
}
export const NOTIFICATIONS = {
    DESCRIPTIONS: {
        WELCOME: 'Welcome to Noom',
        TEAM_JOIN: 'Welcome to Noom',
        TEAM_LEAVE: 'Welcome to Noom',
        ISSUE_ASSIGNED: 'Welcome to Noom',
        ISSUE: 'A new issue has been created',
        COMMENT: 'A new comment',
        ATTACHMENT_COMMENT: 'There is a new attachment comment',
        TEAM: 'New team',

        //
        ISSUE_WIDGET: 'New issue from widget',
        ISSUE_EMAIL: 'New issue from email',
        ISSUE_USER_ASSIGN: 'You have been assigned to an issue',
        ISSUE_COMMENT: 'There is a new comment',
        ATTACHMENT_COMMENT_EMAIL: 'New attachment comment from email',
        COMMENT_EMAIL: 'New comment from email',
        ISSUE_ATTACHMENT_COMMENT: 'There is a new attachment comment',
    },
}
export const EMAIL_TYPE = {
    ISSUE: 'ISSUE',
    COMMENT: 'COMMENT',
    ATTACHMENT_COMMENT: 'ATTACHMENT_COMMENT',
}
export const FILE = 'FILE'
export const RECORDING = 'RECORDING'
export const SCREENSHOT = 'SCREENSHOT'
export const S3 = {
    EXPIRES: 60 * 60,
}
export const WS_EVENT_TYPE = {
    PONG: 'PONG',
    ISSUE: {
        CREATE: 'CREATE',
        DELETE: 'DELETE',
        UPDATE: 'UPDATE',
    },
    TEAM: {
        DELETE: 'DELETE',
        LEAVE: 'LEAVE',
    },
    COMMENT: 'COMMENT',
    ATTACHMENT_COMMENT: 'ATTACHMENT_COMMENT',
}
