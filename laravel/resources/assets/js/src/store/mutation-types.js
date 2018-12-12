// --------------------------------------------
// notification
// --------------------------------------------
export const NOTIFY_PRIMARY = 'NOTIFY_PRIMARY';
export const NOTIFY_SUCCESS = 'NOTIFY_SUCCESS';
export const NOTIFY_INFO = 'NOTIFY_INFO';
export const NOTIFY_WARNING = 'NOTIFY_WARNING';
export const NOTIFY_DANGER = 'NOTIFY_DANGER';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION';

// --------------------------------------------
// mutations
// --------------------------------------------
export const READY = 'READY';
export const SET_LANG = 'SET_LANG';
export const SET_THEME = 'SET_THEME';
export const LOGOUT = 'LOGOUT';
export const USERNAME = 'USERNAME';

// --------------------------------------------
// modules
// --------------------------------------------
// tableView
export const REMOVE_DUPLICATED_CALENDAR_DAY = 'REMOVE_DUPLICATED_CALENDAR_DAY';
export const PUSH_CALENDAR_DAY = 'PUSH_CALENDAR_DAY';
export const SORT_CELL_ITEMS = 'SORT_CELL_ITEMS';
export const CHECK_TIME = 'CHECK_TIME';

// tableView/item/insert
export const INSERT = 'INSERT';
export const DUPLICATE_PREPARE = 'DUPLICATE_PREPARE';

// tableView: toolPalette
export const TOGGLE_TABLE_TOOL_PALETTE = 'TOGGLE_TABLE_TOOL_PALETTE';
export const TOGGLE_SHOW_HIDE_COLUMN = 'TOGGLE_SHOW_HIDE_COLUMN';
export const TOGGLE_SHOW_HIDE_EVENT_ITEM = 'TOGGLE_SHOW_HIDE_EVENT_ITEM';
export const TOGGLE_SHOW_HIDE_TASK_ITEM = 'TOGGLE_SHOW_HIDE_TASK_ITEM';
export const TOGGLE_SHOW_HIDE_END_TIME = 'TOGGLE_SHOW_HIDE_END_TIME';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_INTERNAL_QUERY = 'SET_INTERNAL_QUERY';

// tableView/item/update
export const TOGGLE_TASK_DONE = 'TOGGLE_TASK_DONE';

// --------------------------------------------
// modules (dnd)
// --------------------------------------------
export const DRAG_START = 'DRAG_START';
export const DRAG_ENTER = 'DRAG_ENTER';
export const DROP = 'DROP';
export const REVERSE_ITEM = 'REVERSE_ITEM';
export const SET_ON_MINI_CAL = 'SET_ON_MINI_CAL';
export const DRAG_END = 'DRAG_END';

// --------------------------------------------
// modules (store)
// --------------------------------------------
// index
export const INIT = 'INIT';
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const SET_VALUE = 'SET_VALUE';

// insert, update, remove
export const IS_LOADING = 'IS_LOADING';

// insert, update
export const RESET = 'RESET';

// insert
export const SET_INSERT_VALUE = 'SET_INSERT_VALUE';

// update
export const PREPARE = 'PREPARE';
export const PREPARE_MODAL = 'PREPARE_MODAL';
export const SET_UPDATE_VALUE = 'SET_UPDATE_VALUE';
export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const UPDATE = 'UPDATE';
