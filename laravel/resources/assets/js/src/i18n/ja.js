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
        deleteConfirmModal: {
            deleteButtonLabel: '削除',
            deleteConfirmMessage: '削除してもよろしいですか？',
            okButtonLabel: 'OK',
            cancelButtonLabel: 'キャンセル'
        },
        dashboard: {
            createNewCalendar: '新しいカレンダーを作成',
            createNewMember: '新しいメンバー/役割を作成',
            userCalendarPane: {
                newModal: {
                    userCalendarName: 'カレンダーの名前',
                    description: '説明',
                    createButtonLabel: '作成',
                    cancelButtonLabel: 'キャンセル'
                },
                editModal: {
                    userCalendarName: 'カレンダーの名前',
                    description: '説明'
                }
            }
        },
        dashboardMenu: {
            calendars: 'カレンダー',
            members: 'メンバー',
            groups: 'グループ',
            applications: 'アプリケーション',
            settings: '設定'
        },
        settingsPane: {
            general: '基本設定',
            theme: 'テーマ',
            language: '言語',
            userAccount: 'アカウント設定',
            username: 'ユーザー名',
            changePassword: 'パスワード変更',
            save: '保存する'
        },
        calendarMenu: {
            dashboard: 'ダッシュボード',
            createNewOne: '新規作成'
        },
        calendarToolPalette: {
            search: 'キーワードで検索',
            date: '曜日',
            all: '全て',
            mon: '月',
            tue: '火',
            wed: '水',
            thu: '木',
            fri: '金',
            sat: '土',
            sun: '日',
            item: 'アイテム',
            event: '予定',
            task: 'タスク',
            endTime: '終了時刻'
        },
        itemInsert: {
            contentHere: 'タイトル',
            event: '予定',
            task: 'タスク'
        },
        item: {
            allDay: '終日',
            taskDone: '完了',
            memo: 'メモ',
            delete: '削除',
            save: '保存',
            confirmation: '削除しますか？',
            cancel: 'キャンセル',
            ok: 'OK'
        },
        timePicker: {
            hh: '時',
            mm: '分',
            error: 'エラー',
            done: 'OK'
        },
        calendar: {
            jumpToTop: 'ページ先頭へ'
        }
    }
}
