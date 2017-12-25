export default {
    namespaced: true,
    state: {
        root: {
            title: 'タイトル',
            subtitle: '家族、仕事、プライベート、仲間の予定やタスクも一つのカレンダーで',
            login: 'ログイン',
            startNow: '今すぐ無料で始める',
            alreadyHasAccount: 'すでにアカウントを持っています'
        },
        navbar: {
            home: 'ホーム',
            login: 'ログイン',
            register: 'ユーザー登録',
            dashboard: 'ダッシュボード',
            accountSettings: 'アカウント設定',
            logout: 'ログアウト'
        },
        theme: {
            ruri: '瑠璃',
            koiai: '濃藍',
            nadeshiko: '撫子',
            mikan: '蜜柑',
            sumire: '菫',
            moegi: '萌葱'
        },
        login: {
            email: 'メールアドレス',
            password: 'パスワード',
            rememberMe: 'ログイン状態を保持',
            forgotYourPassword: 'パスワードリセット',
            login: 'ログイン'
        },
        register: {
            name: '名前',
            email: 'メールアドレス',
            password: 'パスワード',
            passwordConfirmation: 'パスワード（確認）',
            loginForm: 'ログイン',
            register: 'ユーザー登録'
        },
        passwordMail: {
            email: 'メールアドレス',
            loginForm: 'ログイン',
            sendPasswordResetLink: 'メール 送信'
        },
        passwordMailResult: {
            success: 'メールを送信しました',
            failed: 'メール送信に失敗しました',
            tryAgain: 'もう一度メールを送る'
        },
        userSettingsIndex: {
            title: 'アカウント設定',
            subtitle: 'ユーザー情報',
            generalInfomation: '基本情報',
            themeSettings: 'テーマ',
            passwordChange: 'パスワード変更'
        },
        userSettingsGeneral: {
            name: 'ユーザー名',
            save: '保存'
        },
        userSettingsPasswordChange: {
            currentPassword: '現在のパスワード',
            newPassword: '新規パスワード',
            newPasswordConfirmation: '新規パスワード（確認）',
            changePassword: 'パスワード変更'
        },
        dashboard: {
            createNewCalendar: '新しいカレンダーを作成',
            createNewMember: '新しいメンバー/役割を作成'
        },
        dashboardMenu: {
            calendars: 'カレンダー',
            members: 'メンバー',
            groups: 'グループ',
            applications: 'アプリケーション'
        },
        calendarMenu: {
            dashboard: 'ダッシュボード',
            createNewOne: '新規作成'
        },
        calendar: {
            jumpToTop: 'ページ先頭へ'
        }
    }
}
