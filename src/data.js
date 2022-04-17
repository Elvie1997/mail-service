import { faEnvelope, faThumbsDown, faTrashAlt, faFileLines, faReplyAll } from '@fortawesome/free-solid-svg-icons'

// Email Types

export const inbox = [
    {
        id: 'inbox-1',
        sender: 'Elon Musk',
        title: 'Tesla News',
        message: 'What is uuuuuuuup? Check out my interview here - https://www.youtube.com/watch?v=DxREm3s1scA. What are your thoughts?',
        time: '15:54',
        checked: false,
        isRead: false,
        folder: 'inbox'
    },
    {
        id: 'inbox-2',
        sender: 'Dan Abramov',
        title: "How's it goin'?",
        message: "Hi there! How is your React learning going? You're doing well?",
        time: '12:18',
        checked: false,
        isRead: false,
        folder: 'inbox'
    },
    {
        id: 'inbox-3',
        sender: 'Pavel Durov',
        title: "Try It Out",
        message: "Telegram keeps your messages safe from hacker attacks. Telegram delivers messages faster than any other application.Telegram is so simple you already know how to use it. Wanna try it?",
        time: '10:05',
        checked: false,
        isRead: false,
        folder: 'inbox'
    },
    {
        id: 'inbox-4',
        sender: 'Ulbi TV',
        title: "New React",
        message: 'React 18 just came out. Check out my video to see what it brought to us - https://www.youtube.com/watch?v=qdCGwwSefX8.',
        time: '6:46',
        checked: false,
        isRead: false,
        folder: 'inbox'
    },{
        id: 'inbox-5',
        sender: 'Fitbit',
        title: "Act quick! Up to $140 off",
        message: "There's only one more day to save on select smartwatches and trackers.",
        time: '5:32',
        checked: false,
        isRead: false,
        folder: 'inbox'
    },{
        id: 'inbox-6',
        sender: 'HidrateSpark',
        title: "Introducing new lineup of our product",
        message: "Forget thirst. Fight Dehydration 🍶🍶🍶",
        time: '4:15',
        checked: false,
        isRead: false,
        folder: 'inbox'
    },{
        id: 'inbox-7',
        sender: 'Bob Ziroll',
        title: "Join Scrimba",
        message: "Join Scrimba to boost up your frontend skills!",
        time: '3:05',
        checked: false,
        isRead: false,
        folder: 'inbox'
    },
]

export const sent = [
    {
        id: 'sent-1',
        name: 'sent',
        sender: 'Google',
        title: "Vibes",
        message: "You're guys awesome!",
        time: '7 апр',
        checked: false,
        isRead: true,
        folder: 'sent'
    },{
        id: 'sent-2',
        name: 'sent',
        sender: 'HidrateSpark',
        title: "Introducing new lineup of our product",
        message: "Your product is outstanding!",
        time: '5 апр',
        checked: false,
        isRead: true,
        folder: 'sent'
    },{
        id: 'sent-3',
        name: 'sent',
        sender: 'Bob Ziroll',
        title: "Join Scrimba",
        message: "I surely will",
        time: '2 апр',
        checked: false,
        isRead: true,
        folder: 'sent'
    },
]

export const drafts = [
    {
        id: 'draft-1',
        sender: 'Person 1',
        title: "Yo yo what is up?",
        message: "How are you doing?",
        time: '2:03',
        checked: false,
        isRead: false,
        folder: 'drafts'
    },{
        id: 'draft-2',
        sender: 'Person 2',
        title: "Call me back",
        message: "Waiting for your call",
        time: '00:17',
        checked: false,
        isRead: false,
        folder: 'drafts'
    },
]

export const spam = [
    {
        id: 'spam-1',
        sender: 'Spam Sender',
        title: "Sign in",
        message: "Sign in to our platform",
        time: '2 фев',
        checked: false,
        isRead: false,
        folder: 'spam'
    },{
        id: 'spam-2',
        sender: 'Another Spam Sender',
        title: "Send your card number",
        message: "What is your card number, please?",
        time: '21 дек',
        checked: false,
        isRead: false,
        folder: 'spam'
    },
]

export const trash = [
    {
        id: 'trash-1',
        sender: 'YouTube',
        title: "You have unread comments",
        message: "Someone left comments under your video.",
        time: '1 апр',
        checked: false,
        isRead: false,
        folder: 'trash'
    },{
        id: 'trash-2',
        sender: 'Facebook',
        title: "You may know them",
        message: "Sign in to see your possible friends.",
        time: '25 мар',
        checked: false,
        isRead: false,
        folder: 'trash'
    },
]

// Folders Data

export const data =  {
    inbox: {
        id: 1,
        name: 'inbox',
        emails: inbox,
        isSomeSelected: false,
        icon: faEnvelope,
        title: 'Входящие',
    },
    sent: {
        id: 2,
        name: 'sent',
        emails: sent,
        isSomeSelected: false,
        icon: faReplyAll,
        title: 'Отправленные',
    },
    drafts: {
        id: 3,
        name: 'drafts',
        emails: drafts,
        isSomeSelected: false,
        icon: faFileLines,
        title: 'Черновики',
    },
    spam: {
        id: 4,
        name: 'spam',
        emails: spam,
        isSomeSelected: false,
        icon: faThumbsDown,
        title: 'Спам',
        total: '',
        delete: 'Очистить',
    },
    trash: {
        id: 5,
        name: 'trash',
        emails: trash,
        isSomeSelected: false,
        icon: faTrashAlt,
        title: 'Корзина',
        total: '',
        delete: 'Очистить',
    }    
}


