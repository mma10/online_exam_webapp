import $ from 'jquery';

export const addTableClass = (year,tableColor) => {
    $("#" + year.toString() + ' .table').addClass(tableColor);
};

