import Vue from 'vue';

export default {

    // ---------------------------------------------
    // app

    ready( state, val ) {
        state.app.ready = val
    },

    setLang( state, val ) {
        state.app.lang = val;
    },

    // ---------------------------------------------
    // theme

    setTheme( state, name ) {
        localStorage.setItem('theme', name);
        state.app.theme.name = name;
        switch (name) {
            case 'koiai':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-koiai';
                state.app.theme.primary.classInvert = 'is-koiai-invert';
                state.app.theme.primary.code = '#002e4e';
                state.app.theme.primary.codeInvert = '#b0bfc8';

                state.app.theme.secondary.class = 'is-koiai-secondary';
                state.app.theme.secondary.classInvert = 'is-koiai-secondary-invert';
                state.app.theme.secondary.code = '#1960b7';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
            case 'nadeshiko':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-nadeshiko';
                state.app.theme.primary.classInvert = 'is-nadeshiko-invert';
                state.app.theme.primary.code = '#f6adc6';
                state.app.theme.primary.codeInvert = '#49343b';

                state.app.theme.secondary.class = 'is-nadeshiko-secondary';
                state.app.theme.secondary.classInvert = 'is-nadeshiko-secondary-invert';
                state.app.theme.secondary.code = '#ee6896';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
            case 'mikan':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-mikan';
                state.app.theme.primary.classInvert = 'is-mikan-invert';
                state.app.theme.primary.code = '#f08300';
                state.app.theme.primary.codeInvert = '#fbdab3';

                state.app.theme.secondary.class = 'is-mikan-secondary';
                state.app.theme.secondary.classInvert = 'is-mikan-secondary-invert';
                state.app.theme.secondary.code = '#ffc112';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
            case 'sumire':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-sumire';
                state.app.theme.primary.classInvert = 'is-sumire-invert';
                state.app.theme.primary.code = '#7058a3';
                state.app.theme.primary.codeInvert = '#cfc7e0';

                state.app.theme.secondary.class = 'is-sumire-secondary';
                state.app.theme.secondary.classInvert = 'is-sumire-secondary-invert';
                state.app.theme.secondary.code = '#b688ff';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
            case 'moegi':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-moegi';
                state.app.theme.primary.classInvert = 'is-moegi-invert';
                state.app.theme.primary.code = '#aacf53';
                state.app.theme.primary.codeInvert = '';

                state.app.theme.secondary.class = 'is-moegi-secondary';
                state.app.theme.secondary.classInvert = 'is-moegi-secondary-invert';
                state.app.theme.secondary.code = '#37af05';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
        }
    },

    // ---------------------------------------------
    // auth

    login( state, name ) {
        state.user.name = name;
    },

    logout( state ) {
        window.sessionStorage.clear();
        state.user.name = null;
        state.user.token = null;
        state.calendar.currentId = 'dashboard';
    },

    username( state, name ) {
        state.user.name = name;
    },

    // ---------------------------------------------
    // user calendar

    initUserCalendar( state, userCalendars ) {
        state.calendar.data.userCalendars = userCalendars;
    },

    setCurrentCalendarId( state, id ) {
        state.calendar.currentId = id;
        localStorage.setItem('currentCalendarId', id);
    },

    // ---------------------------------------------
    // calendar

    initCalendar( state, calendars ) {
        state.calendar.data.calendars = calendars;
    },

    setCurrentYear( state, year ) {
        state.calendar.currentYear = year;
    },

    setCurrentMonth( state, month ) {
        state.calendar.currentMonth = month;
    },

    setCalendarName( state, { id, name } ) {
        state.calendar.data.userCalendars[id].name = name;
    },

    setCalendarDescription( state, { id, description } ) {
        state.calendar.data.userCalendars[id].description = description;
    },

    // ---------------------------------------------
    // calendar (behavior)

    toggleIsEventItemShow( state, val ) {
        state.calendar.behavior.isEventItemShow = val;
    },

    toggleIsTaskItemShow( state, val ) {
        state.calendar.behavior.isTaskItemShow = val;
    },

    toggleTableToolPalette( state, val ) {
        state.calendar.behavior.toolPalette.isActive = val;
    },

    toggleColumnInserting( state, { isInserting, insertingColumnId } ) {
        state.calendar.behavior.column.isInserting = isInserting;
        state.calendar.behavior.column.insertingColumnId = insertingColumnId;
    },

    toggleColumnEditing( state, { isEditing, editingColumnId } ) {
        state.calendar.behavior.column.isEditing = isEditing;
        state.calendar.behavior.column.editingColumnId = editingColumnId;
    },

    toggleColumnDeleting( state, { isDeleting, deletingColumnId } ) {
        state.calendar.behavior.column.isDeleting = isDeleting;
        state.calendar.behavior.column.deletingColumnId = deletingColumnId;
    },

    toggleItemInserting( state, { isInserting, insertingCellTo } ) {
        state.calendar.behavior.item.isInserting = isInserting;
        state.calendar.behavior.item.insertingCellTo = insertingCellTo;
    },

    toggleItemEditing( state, { isEditing, editingItem } ) {
        state.calendar.behavior.item.isEditing = isEditing;
        state.calendar.behavior.item.editingItem = editingItem;
    },

    setSearchQuery( state, val ) {
        state.calendar.behavior.query.search = val;
    },

    setInternalQuery( state, val ) {
        state.calendar.behavior.query.internal = val;
    },

    // ---------------------------------------------
    // members

    initMembers( state, members ) {
        state.calendar.data.members = members;
    },

    setMemberStatusIsShow(state, { id, val }) {
        state.calendar.data.members[id].isShow = val;
    },

    addMember( state, { key, data } ) {
        Vue.set(state.calendar.data.members, key, data);
        state.calendar.data.calendars.forEach( function(val, index) {
            Vue.set( val.items, key, [{
                'editing': false,
                'is_hover': false
            }]);
        });
    },

    updateMember( state, member ) {
        state.calendar.data.members[member.id].name = member.name;
        state.calendar.data.members[member.id].order = member.order;
    },

    deleteMember( state, id ) {
        Vue.delete(state.calendar.data.members, id);
        state.calendar.data.calendars.forEach( function(val, index) {
            Vue.delete( val.items, id);
        });
    },

    // ---------------------------------------------
    // cellItems

    setCellItems( state, { dayIndex, memberId, val } ) {
        const columns = state.calendar.data.calendars[dayIndex].items;
        if(columns instanceof Object) {
            //columns[memberId] = val;
            Vue.set(columns, memberId, val);
        }
    },

    sortCellItemsByStartTime( state, data ) {
        data.forEach(function(day, dayIndex) {
            const columns = day.items;
            const memberIds = Object.keys(columns);

            memberIds.forEach(function(memberId) {
                if(columns[memberId].length < 1) return;
                columns[memberId].sort((a, b) => {
                    if(a.type_id === 1 && b.type_id === 2) return 1;
                    if(a.type_id === 2 && b.type_id === 1) return -1;
                    if(a.type_id === 2 && b.type_id === 2) return 0;
        
                    if( a.start_time === undefined || a.start_time === null ) return -1;
                    if( b.start_time === undefined || b.start_time === null ) return 1;
        
                    const aArr = a.start_time.split(':');
                    const bArr = b.start_time.split(':');
        
                    // sort by hour
                    if (parseInt(aArr[0]) < parseInt(bArr[0])) return -1;
                    if (parseInt(aArr[0]) > parseInt(bArr[0])) return 1;
        
                    // sort by minits
                    if (parseInt(aArr[1]) < parseInt(bArr[1])) return -1;
                    if (parseInt(aArr[1]) > parseInt(bArr[1])) return 1;
        
                    // the same value
                    return 0;
                });
            });
        });
    },

    // ---------------------------------------------
    // item

    addItem( state, { dayIndex, memberId, val } ) {
        const cellItems = state.calendar.data.calendars[dayIndex].items[memberId];
        if(cellItems instanceof Array) {
            cellItems.push(val);
        }
    },

    removeItem( state, { dayIndex, memberId, itemIndex } ) {
        const cellItems = state.calendar.data.calendars[dayIndex].items[memberId];
        if(cellItems instanceof Array && cellItems[itemIndex]) {
            cellItems.splice(itemIndex, 1);
        }
    },

    setDateToItem( state, { dayIndex, memberId, itemIndex, val } ) {
        const cellItems = state.calendar.data.calendars[dayIndex].items[memberId];
        if(cellItems instanceof Array && cellItems[itemIndex]) {
            cellItems[itemIndex].date = val;
        }
    },

    setMemberIdToItem( state, { dayIndex, memberId, itemIndex, val } ) {
        const cellItems = state.calendar.data.calendars[dayIndex].items[memberId];
        if(cellItems instanceof Array && cellItems[itemIndex]) {
            cellItems[itemIndex].member_id = val;
        }
    },

//    refreshCellItems( state, { dayIndex, memberId, val } ) {
//        state.calendar.data.calendars[dayIndex].items[memberId] = null;
//        state.calendar.data.calendars[dayIndex].items[memberId].push(val);
//    }
}
