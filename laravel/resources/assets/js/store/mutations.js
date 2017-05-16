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

    // ---------------------------------------------

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

    // ---------------------------------------------
    
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

                // set dayIndex & itemIndex
                columns[memberId].forEach(function(item, index) {
                    item.dayIndex = parseInt((item.date.split('-'))[2]) - 1;
                    item.itemIndex = index;
                });

            });
        });
    },

    // ---------------------------------------------
    // item - addItem

    prepareInsertItem( state, { dayIndex, memberId, cellItems } ) {
        state.calendar.behavior.item.addItem.isActive = true;
        state.calendar.behavior.item.addItem.enterCell.dayIndex = dayIndex;
        state.calendar.behavior.item.addItem.enterCell.memberId = memberId;
        state.calendar.behavior.item.addItem.enterCell.cellItems = cellItems;
    },

    startInsertItem( state ) {
        state.calendar.behavior.item.addItem.isLoading = true;
    },

    insertItem( state, { dayIndex, memberId, val } ) {
        const cellItems = state.calendar.data.calendars[dayIndex].items[memberId];
        if(cellItems instanceof Array) {
            cellItems.push(val);
        }
    },

    setNewItemContent( state, value ) {
        state.calendar.behavior.item.addItem.newItem.content = value;
    },

    finishInsertItem( state ) {
        state.calendar.behavior.item.addItem.isActive = false;
        state.calendar.behavior.item.addItem.isLoading = false;
        state.calendar.behavior.item.addItem.enterCell.dayIndex = '';
        state.calendar.behavior.item.addItem.enterCell.memberId = '';
        state.calendar.behavior.item.addItem.enterCell.cellItems = '';
        state.calendar.behavior.item.addItem.newItem.content = '';
    },

    // ---------------------------------------------
    // item - editItem

    prepareUpdateItem( state, { editingItem } ) {
        state.calendar.behavior.item.editItem.isActive = true;
        state.calendar.behavior.item.editItem.editingItem = editingItem;
    },

    startUpdateItem( state ) {
        state.calendar.behavior.item.editItem.isLoading = true;
    },

    updateItem( state, { item, params } ) {
        const keys = Object.keys(params);
        keys.forEach(function(key) {
            item[key] = params[key];
        });
    },

//    updateItem( state, { dayIndex, memberId, itemIndex, params } ) {
//        const cellItems = state.calendar.data.calendars[dayIndex].items[memberId];
//        if(cellItems instanceof Array && cellItems[itemIndex]) {
//            const keys = Object.keys(params);
//            keys.forEach(function(key) {
//                cellItems[itemIndex][key] = params[key];
//            });
//        }
//    },

    finishUpdateItem( state ) {
        state.calendar.behavior.item.editItem.isActive = false;
        state.calendar.behavior.item.editItem.isLoading = false;
        state.calendar.behavior.item.editItem.editingItem = '';
    },

    // ---------------------------------------------
    // item - deleteItem

    prepareRemoveItem( state, { cellItems, deletingItem } ) {
        state.calendar.behavior.item.deleteItem.isActive = true;
        state.calendar.behavior.item.deleteItem.deletingItem = deletingItem;
        state.calendar.behavior.item.deleteItem.cellItems = cellItems;
    },

    startRemoveItem( state ) {
        state.calendar.behavior.item.deleteItem.isLoading = true;
    },

    removeItem( state ) {
        const item = state.calendar.behavior.item.deleteItem.deletingItem;
        if( !state.calendar.behavior.item.deleteItem.isActive || !item ) return;

        //const cellItems = state.calendar.data.calendars[item.dayIndex].items[item.member_id];
        const cellItems = state.calendar.behavior.item.deleteItem.cellItems;
        if(cellItems instanceof Array && cellItems[item.itemIndex]) {
            cellItems.splice(item.itemIndex, 1);
        }
    },

    finishRemoveItem( state ) {
        state.calendar.behavior.item.deleteItem.isActive = false;
        state.calendar.behavior.item.deleteItem.isLoading = false;
        state.calendar.behavior.item.deleteItem.deletingItem = '';
        state.calendar.behavior.item.deleteItem.cellItems = '';
    },

    // ---------------------------------------------
    // item - dnd

    dragStart( state, { fromCellAddress, fromDayIndex, fromMemberId, fromCellItems, fromCellItemsIndex, draggingItem }) {
        state.calendar.behavior.item.dragItem.fromCell.cellAddress = fromCellAddress,
        state.calendar.behavior.item.dragItem.fromCell.dayIndex = fromDayIndex,
        state.calendar.behavior.item.dragItem.fromCell.memberId = fromMemberId,
        state.calendar.behavior.item.dragItem.fromCell.cellItems = fromCellItems,
        state.calendar.behavior.item.dragItem.fromCell.cellItemsIndex = fromCellItemsIndex,
        state.calendar.behavior.item.dragItem.draggingItem = draggingItem
    },

    dragEnter( state, { toCellAddress, toDayIndex, toMemberId }) {
        state.calendar.behavior.item.dragItem.enterCell.cellAddress = toCellAddress,
        state.calendar.behavior.item.dragItem.enterCell.dayIndex = toDayIndex,
        state.calendar.behavior.item.dragItem.enterCell.memberId = toMemberId
    },

    dragDrop( state, { toCellItems }) {
        state.calendar.behavior.item.dragItem.isLoading = true,
        state.calendar.behavior.item.dragItem.isDropped = true,
        state.calendar.behavior.item.dragItem.enterCell.cellItems = toCellItems
    },

    dragDropInTrash( state, { fromCellItems, fromCellItemsIndex, draggingItem }) {
        state.calendar.behavior.dragItem.isLoading = true,
        state.calendar.behavior.item.dragItem.isInTrash = true,
        state.calendar.behavior.item.dragItem.draggingItem = draggingItem,
        state.calendar.behavior.item.dragItem.fromCell.cellItems = fromCellItems,
        state.calendar.behavior.item.dragItem.fromCell.cellItemsIndex = fromCellItemsIndex
    },

    dragEnd( state ) {
        state.calendar.behavior.item.dragItem.isLoading = false
    },

    finishDragItem( state ) {
        state.calendar.behavior.item.dragItem.isLoading = false,
        state.calendar.behavior.item.dragItem.isDropped = false,
        state.calendar.behavior.item.dragItem.enterTrash = false,
        state.calendar.behavior.item.dragItem.draggingItem = '',
        state.calendar.behavior.item.dragItem.fromCell.cellAddress = '',
        state.calendar.behavior.item.dragItem.fromCell.dayIndex = '',
        state.calendar.behavior.item.dragItem.fromCell.memberId = '',
        state.calendar.behavior.item.dragItem.fromCell.cellItems = '',
        state.calendar.behavior.item.dragItem.fromCell.cellItemsIndex = '',
        state.calendar.behavior.item.dragItem.enterCell.cellAddress = '',
        state.calendar.behavior.item.dragItem.enterCell.dayIndex = '',
        state.calendar.behavior.item.dragItem.enterCell.memberId = '',
        state.calendar.behavior.item.dragItem.enterCell.cellItems = ''
    },

    moveItem( state, { fromDayIndex, fromMemberId, fromCellItemsIndex, toDayIndex, toMemberId, item } ) {
        const fromCellItems = state.calendar.data.calendars[fromDayIndex].items[fromMemberId];
        const toCellItems = state.calendar.data.calendars[toDayIndex].items[toMemberId];

        if(fromCellItems instanceof Array 
            && toCellItems instanceof Array
            && fromCellItems[fromCellItemsIndex]
        ) {

            const y = state.calendar.currentYear;
            const m = state.calendar.currentMonth;

            // update item
            item.date = y + '-' + m + '-' + (toDayIndex + 1);
            item.member_id = toMemberId;

            // remove item
            fromCellItems.splice(fromCellItemsIndex, 1);

            // add item
            toCellItems.push(item);
        }
    },
}
