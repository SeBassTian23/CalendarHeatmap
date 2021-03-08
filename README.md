# Calendar Heat Map

This [jQuery] plugin allows to conveniently display data like contributions on a day by day basis, indicating the count by colors.

![Calendar Heat Map](https://user-images.githubusercontent.com/6181737/33098032-04143994-ceda-11e7-9a05-47dbef561a70.png)

## Install

### Using NPM

```Bash
npm install jquery-calendar-heatmap
```

### Using bower

```Bash
bower install jquery-calendar-heatmap
```

### Manual

+ Download the latest release from [here](https://github.com/SeBassTian23/CalendarHeatmap/releases/latest).
+ Copy the `jquery.CalendarHeatmap.js` and the `jquery.CalendarHeatmap.css` into your project. Of cause you can use the minified versions, indicated by `.min.js` and `.min.css` as well.

## Usage

1. Include [jQuery] and [Moment.js] into the header of your html file:

    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    ```

2. Include the plugin *after* [jQuery] and [Moment.js]:

    ```html
    <script src="dist/jquery.CalendarHeatmap.min.js"></script>
    ```

3. When the DOM is ready call the plugin:

    ```JavaScript
    $("#element").CalendarHeatmap( data, options );
    ```

## Dates (Data)

The provided date needs to be a valid [date format] that can be interpreted by [Moment.js].
The date needs to provide at least with year month and day, e.g. `YYYY-MM-DD` or as a unix timestamp e.g. `1578518342658`.

```JavaScript
// Provide dates as an array of objects.
// Provide the keys `count` and date. Make sure, each date provided is unique for that day.
var data = [{count: 2, date: "2017-09-23"}, ...]

// Provide dates as an array.
// The dates can have any format as long as year month and day are provided.
var data = [ "2017-09-23", ...]

// Provide dates as an object.
// The key is the date, the value is event count. Make sure the date has this format: `YYYY-MM-DD`
var data = { "2017-09-23": 2, ...}
```

## Interactions (Functions)

After the plugin is initialized for the element, the following options are available to interact with the calendar heatmap.

### Get Dates

The currently displayed data from the calendar heatmap can be received using the `getDates` argument. This is not the original data provided, but the data format internally used.

```JavaScript
// Get current data from the calendar heatmap
$("#element").CalendarHeatmap( "getDates" );
```

### Update Dates

The data displayed in the calendar heatmap can be updated/replaced using the `updateDates` argument and providing new data. In case data should be added to the existing, use the `appendDates` argument. The data provided can be in any format described above.

```JavaScript
// Update/Replace the current data with a new data
$("#element").CalendarHeatmap( "updateDates", data );
```

### Append Dates

Dates can be added to the currently displayed data in the calendar heatmap using the `appendDates` argument and providing the data to be added. The counts are added to existing dates. The data provided can be in any format described above.

```JavaScript
// Append data to the current data
$("#element").CalendarHeatmap( "appendDates", data );
```

### Get Options

The options object with the current settings can be received using the `getOptions` argument. It contains all options, not just the ones initially set.

```JavaScript
// Get the calendar heatmap's current options
$("#element").CalendarHeatmap( "getOptions" );
```

### Update Options

The options object with the current settings can be updated using the `getOptions` argument. Individual options can be provided, the full object as returned by `getOptions` is not required.

```JavaScript
// Set the calendar heatmap's title option
$("#element").CalendarHeatmap( "updateOptions" {
    title: "New Title"
} );
```

## Options

The Calendar Heat Map can be modified using the following options:

```JavaScript
// Default options for the heatmap
{
    title: null,
    months: 12,
    weekStartDay: 1,
    lastMonth: 1,
    lastMonth: "current month",
    lastYear: "current year",
    labels: {
        days: false,
        months: true,
        custom: {
            weekDayLabels: null,
            monthLabels: null
        }
    },
    tiles: {
        shape: "square"
    }
    legend: {
        show: true,
        align: "right",
        minLabel: "Less",
        maxLabel: "More",
        divider: " to "
    },
    tooltips: {
        show: false,
        options: {}
    }
}
```

### title

You can add a title to the calendar heatmap. If no title is set, or set to `null` it will get ignored.

### months

The number of months to display. If not set, the default number of months to be displayed is `12`.

### lastMonth

The last month shown in the calendar heatmap. Set the month by setting the value between `1 - 12`. If not set, the default is the current month.

### lastYear

The year of the last month shown. Use the four letter notation, e.g. `2017`. If not set, the default is the current year.

### weekStartDay

The first day of the week. Set the day by setting the value between `1 - 7`, where `1` is Monday, `2` is Tuesday and so on. If not defined, Monday is the start day.

### coloring

There is a set of different color gradients available. By default `standard` is selected.

#### Available Color Gradients

The following gradients are available based of [Matplotlib] for Python: `blue`, `earth`, `electric`, `green`, `picknick`, `red`, `teal`, `standard`, `viridis`. If you want to define your own color gradient, use `custom` and add the classes defining the colors to your css stylesheet as described below.

#### Custom Gradient

Just add the colors to be used for the 4 steps as in the example. In this case the name set for `coloring` would be the base class name `custom`.

```css
.custom-1 {
  background-color: #a6c96a !important;
}
.custom-2 {
  background-color: #5cb85c !important;
}
.custom-3 {
  background-color: #009e47 !important;
}
.custom-4 {
  background-color: #00753a !important;
}
```

### labels

The calendar heatmap has two sets of labels. One for week days and one for months. By default only the month labels are shown. The visibility can be set for either by setting them to `true` or `false`.

#### Custom format

Week day and month labels can be formatted using the [Moment.js] format (e.g. `MM` for the month number or `MMMM` for the full month name). Use an array, to provide custom labels. For months the array needs to contain 12 elements, e.g. `["janv", "févr", ..., "déc."]` and for the week days 7 elements starting with `Sunday`, e.g. `["Dim", "Lun", ..., "Sam"]`.

```JavaScript
labels: {
    days: false,
    months: true,
    custom: {
        weekDayLabels: null,
        monthLabels: null
    }
}
```

### `tiles`

By default, the shape of each day tile is `square`. Further the shapes `rounded` and `circle` are available.

```JavaScript
tiles: {
    shape: "square"
}
```

### `legend`

The legend for the calendar heatmap is located below the heatmap and visible by default. The visibility can be set by setting `show` to `true` or `false`. Set the alignment using `align`. Options are `right`, `center` or `left`. Labels for min and max can be set using `minLabel` and `maxLabel`. Use `null` to hide the labels. Use the divider to change the word between the numbers in the legends tooltips. By default it is ` to ` (e.g. 1 to 10).

```JavaScript
legend: {
    show: true,
    align: "right",
    minLabel: "Less",
    maxLabel: "More",
    divider: " to "
}
```

### `tooltips`

Tooltips require the [Bootstrap] library. Regardless of using the library, the tiles with representing data counts have a title element with count and date. This example is using `Bootstrap 4.x`, but the plugin will work with `Bootstrap 3.x` as well.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
```

To enable the tooltips just set `show` to `true`. By default it is set to `false`. All settings for tooltips are available as [documented][tooltip-documentation] and can be passed on using `options`.

```JavaScript
tooltips: {
    show: true,
    options: {}
}
```

This plugin is based on the [jQuery Boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate).

[Moment.js]: https://momentjs.com/
[date format]: https://momentjs.com/docs/#/parsing/string/
[jQuery]: https://jquery.com/
[Bootstrap]: https://getbootstrap.com/
[tooltip-documentation]: https://getbootstrap.com/docs/4.4/components/tooltips/
[Matplotlib]: https://matplotlib.org/tutorials/colors/colormaps.html?highlight=gradients#miscellaneous