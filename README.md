# Calendar Heatmap

This [jQuery] plugin allows to conveniently display data like contributions on a day by day basis, indicating the count by colors.

![Calendar Heatmap](https://user-images.githubusercontent.com/6181737/33098032-04143994-ceda-11e7-9a05-47dbef561a70.png)

## Usage

1. Include [jQuery] and [Moment.js]:

	```html
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.2/moment.min.js"></script>
	```

2. Include the plugin:

	```html
	<script src="dist/jquery.CalendarHeatmap.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$("#element").CalendarHeatmap(data, options);
	```

## Data

```javascript
var data = [{count: 2, date: "2017-09-23"}, ...]
```
The date needs to have the following format: `YYYY-MM-DD`

## Options

The Calendar Heatmap can be modified in multiple ways:

### `title`
You can add a title to the calendar heatmap. If no title is set, it will get ignored.

### `months`
The number of months to display. If not set, the default number of months to be displayed is `12`.

### `lastMonth`
The last month shown in the calendar heatmap. Set the month by setting the value between `1 - 12`. If not set, the default is the `current` month.

### `lastYear`
The year of the last month shown. Use the four letter notation, e.g. `2017`. If not set, the default is the `current` current year.

### `coloring`
There is a set of different color gradients available. By default `standard` is selected.

#### Gradients
 `earth`, `electric`, `viridis`, `picknick`, `blue`, `green`, `teal`, `red`, `standard`

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


### `labels`
The calendar heat map has two sets of labels. One for week days and one for months. By default only the month labels are shown. The visibility can be set for either by setting them to `true` or `false`.

#### Custom format
Week day and month labels can be formatted using the [Moment.js] format (e.g. `MM` for the month number or `MMMM` for the full month name). Use an array, to provide custom labels. For months the array needs to contain 12 elements, e.g. `["janv", "févr", ..., "déc."]` and for the week days 7.

```javascript
labels: {
	days: false,
	months: true,
	custom: {
		weekDayLabels: null,
		monthLabels: null
	}
}
```

### `legend`
The legend for the calendar heatmap is located below the heatmap and visible by default. The visibility can be set by setting `show` to `true` or `false`. Set the alignment using `align`. Options are `right`, `center` or `left`. Labels for min and max can be set using `minLabel` and `maxLabel`. 

```javascript
legend: {
	show: true,
	align: "right",
	minLabel: "Less",
	maxLabel: "More"
}
```

### `tooltips`
Tooltips require the [Bootstrap] library.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
```

To enable the tooltips just set `show` to `true`. By default it is set to `false`. All settings for tooltips are available as [documented][tooltip-documentation] and can be passed on using `options`.

```javascript
tooltips: {
	show: true,
	options: {}
}
```

This plugin is based on the [jQuery Boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate).

[Moment.js]: http://momentjs.com/
[jQuery]: http://jquery.com/
[Bootstrap]: https://getbootstrap.com/
[tooltip-documentation]: https://getbootstrap.com/docs/3.3/javascript/#tooltips
