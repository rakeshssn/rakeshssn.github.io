/* global crossfilter, dc, d3, queue, $ */

//--------------------------------------------------- SECTION 01 - LOAD THE DATA
queue()
    .defer(d3.json, "https://api.npoint.io/89ea5155e97033aae77a")
    .await(makeGraphs);


//--------------------------------------------------- SECTION 02 - CROSSFILTER THE DATA AND PARSE
function makeGraphs(error, IngData){
    var ndx = crossfilter(IngData);



    show_ing_list(ndx);
    show_avg_viewss(ndx);
    show_claims(ndx);
    show_category(ndx); 
    show_likes(ndx);
    show_dislikes(ndx);
    show_ing_dept_ing(ndx);
    show_total_views(ndx);
    show_number_filtered(ndx);
    show_avg_view_per_ing(ndx);
    show_table_of_properties(ndx);
	show_drop_down_category(ndx);
	show_drop_down_dept(ndx);
	show_drop_down_ing(ndx);
	show_drop_down_claims(ndx);

    dc.renderAll();
}


function show_drop_down_category(ndx)
{
	
	 var dim = ndx.dimension(dc.pluck('category'));
    var group = dim.group();
selectField=dc.selectMenu('#menuselect')
      .dimension(dim)
      .group(group);
}

function show_drop_down_dept(ndx)
{
	
	 var dim = ndx.dimension(dc.pluck('department'));
    var group = dim.group();
selectField=dc.selectMenu('#menuselect1')
      .dimension(dim)
      .group(group);
}

function show_drop_down_ing(ndx)
{
	
	 var dim = ndx.dimension(dc.pluck('ing'),true);
    var group = dim.group();
selectField=dc.selectMenu('#menuselecting')
      .dimension(dim)
      .group(group);
}

function show_drop_down_claims(ndx)
{
	
	 var dim = ndx.dimension(dc.pluck('claims'));
    var group = dim.group();
selectField=dc.selectMenu('#menuselectclaims')
      .dimension(dim)
      .group(group);
}


//--------------------------------------------------- SECTION 03 - CODE FOR CHARTS
//-- ROW CHART - LISTING MAJOR INGREDIENTS IN ROW CHART
function show_ing_list(ndx)
{
  		
	var dim = ndx.dimension(dc.pluck('ing'),true);     // FOR LOOPING THROUGH THE ARRAYS IN ING FIELD OF JSON DATA
    var group = dim.group();

    dc.rowChart("#ing_main_chart")
		.renderLabel(true)
        .width(700)
        .height(400)
        .margins({ top: 20, left: 10, right: 10, bottom: 20 })
        .dimension(dim)
        .group(group)
		//.cap(30)
		//.ordering(dc.pluck('ing'))
        .elasticX(true)
        .xAxis().ticks(3); 
		
		
		
}


//-- NUMBER - AVERAGE VIEW COUNTS
function show_avg_viewss(ndx){
    var avgviewcount = ndx.groupAll().reduce(
        function (p,v) {
            p.count++;
            p.total += v.views;
            p.average = p.total / p.count;
            return p;
        },
        function (p,v) {
            p.count--;
            if(p.count == 0){
                p.total = 0;
                p.average = 0;

            }
            else{
                p.total -= v.views;
                p.average = p.total / p.count;
            }
            return p;
        },
        function () {
            return {count: 0,total: 0,average: 0};
        }

    );

    dc.numberDisplay("#avg_view_number")
        // .formatNumber(d3.format(".2"))
        .valueAccessor(function (d){
            if (d.count == 0){
                return 0;
            }
            else{
                return d.average;
            }
        })
        .group(avgviewcount)
        ;
}

//-- BAR CHART - CLAIMS BAR CHART
function show_claims(ndx){
    var dim = ndx.dimension(dc.pluck('claims'));
    var group = dim.group();

    dc.rowChart('#claims_rowchart')
        .width(600)
        .height(400)
        .dimension(dim)
        .group(group)
        .elasticX(true)
        .cap(10)
        .xAxis().ticks(4)
        ;
}


//-- BAR CHART - CATEGORY OF INGREDIENTS
function show_category(ndx){
    var dim = ndx.dimension(dc.pluck('category'));
    var group = dim.group();
    var fakeGroup = remove_empty_bins(group);

    dc.barChart('#category_bar')
        .width(300)
        .height(330)
        .dimension(dim)
        .group(fakeGroup)
        .elasticX(true)
        .elasticY(true)
        // .brushOn(true)
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal);
}
function remove_empty_bins(source_group) {
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                return d.value != 0;
            });
        }
    };
}


//-- PIE CHARTS FOR LIKES, DISLIKES , VIEWS AND DEPARTMENT
function show_likes(ndx){
    var dim = ndx.dimension(dc.pluck('likes'));
    var group = dim.group();

    dc.pieChart("#number_of_likes")
        .height(250)
        .radius(80)
        .transitionDuration(100)
        .dimension(dim)
        .group(group)
        .minAngleForLabel(.2);
}
function show_dislikes(ndx){
    var dim = ndx.dimension(dc.pluck('dislikes'));
    var group = dim.group();

    dc.pieChart("#number_of_dislikes")
        .height(250)
        .radius(80)
        .transitionDuration(1000)
        .dimension(dim)
        .group(group)
        .minAngleForLabel(.2);
}
function show_ing_dept_ing(ndx){
    var dim = ndx.dimension(dc.pluck('department'));
    var group = dim.group();

    dc.pieChart("#department_type")
        .height(300)
        .radius(100)
        .transitionDuration(1000)
        .dimension(dim)
        .group(group)
        .minAngleForLabel(.2);
}
function show_total_views(ndx){
    var dim = ndx.dimension(function(d){
        if (d['views'] < 500000){
            return "< 500k";
        }
        else if (d['views'] < 750000){
            return "500k to 750k";
        }
        else if (d['views'] < 1200000){
            return "750k to 1.2M";
        }
        else{
            return '> 1.2M +';
        }
    });
    var group = dim.group();

    dc.pieChart("#total_view_count")
        .height(250)
        .radius(100)
        .transitionDuration(1000)
        .dimension(dim)
        .group(group)
        .minAngleForLabel(.2);
}



//-- NUMBER CHART - HOW MANY FILTER
function show_number_filtered(ndx){
	var group = ndx.groupAll();

    dc.dataCount(".dc-data-count")
        .dimension(ndx)
    	.group(group);
}


//-- BUBBLE CHART - NUMBER OF VIEWS VS AVG VIEWS PER INGREDIENT
function show_avg_view_per_ing(ndx){
    var areaDim = ndx.dimension(dc.pluck('ing'));
    var statsByArea = areaDim.group().reduce(
        // increase counter
        function (p,v) {
            p.count++; p.total += v.views; p.average = p.total / p.count;
            return p;
        },

        // decrease counter
        function (p,v) {
            p.count--;
            if(p.count == 0){
                p.total = 0; p.average = 0;}
            else{
                p.total -= v.views; p.average = p.total / p.count; }
            return p;
        },
        // waanted results
        function () {
            return {count: 0,total: 0,average: 0};
        }

    );


    dc.bubbleChart("#bubble_chart")
        .width(1400)
        .height(400)
        .margins({top: 10, right: 50, bottom: 50, left: 68})
        .dimension(areaDim)
        .group(statsByArea)
        .keyAccessor(function (p) {return p.value.average;})
        .valueAccessor(function (p) {return p.value.count;})
        .radiusValueAccessor(function (p) {
            return p.value.average;
        })
        .x(d3.scale.linear().domain([0, 5000000]))
        .r(d3.scale.linear().domain([0, 5000000]))
        .minRadiusWithLabel(15)
        .elasticY(true)
        .yAxisPadding(10)
        .elasticX(true)
        .yAxisLabel("Major Ingredients")
        .xAxisLabel("Average Views for the Ingredient")
        .xAxisPadding(500000)
        .maxBubbleRelativeSize(0.07);
}





//-- TABLE
function show_table_of_properties(ndx){
    const ITEMS_PER_PAGE = 10;
    var offset = 0;
    var filteredTotal = ndx.groupAll();
    var previousFilteredTotalValue = filteredTotal.value();
    var studentDim = ndx.dimension(dc.pluck('url'));

    var table = dc.dataTable("#results-table")
                    .dimension(studentDim)
                    .group(function(d){
                        return '';
                    })
                    .width(500)
                    .size(Infinity)
                    .columns([
                        {
                            label: "YouTube Link",
                            format: function (d) {return `<a href="${d.youtube_link}" target="_blank">YouTube Link  <i class="fas fa-external-link-alt"></i></a>`;}
                        },
						{
                            label: "Ingredients Listed",
                            format: function (d) {return (d.ing);}
                        },
                        
                        {
                            label: "Video Header",
                            format: function(d)
							{ 
							
							
							return `<a href="javascript:void(0)" tooltip = "${d.youtube_header}" <i class='fas fa-comment-alt fa-2x'></i></a>`;}
                       

					   },
						{
                            label: "Department",
                            format: function (d) {return (d.department);}
                        },
                        {
                            label: "Category",
                            format: function (d) {return (d.category);}
                        },
						{
                            label: "Views",
                            format: function (d) {return (d.views);}
                        },
                        {
                            label: "Likes",
                            format: function (d) {return (d.likes);}
                        },
						{
                            label: "Dislikes",
                            format: function (d) {return(d.dislikes);}
                        }
						
                    ]
                );

    function updatePaginationElements() {
        d3.select('#begin').text(offset);
        d3.select('#end').text(
            Math.min(offset+ITEMS_PER_PAGE-1, filteredTotal.value()));
        d3.select('#size').text(filteredTotal.value());
        d3.select('#previous').attr(
            'disabled', offset <= 0 ? "true" : null);
        d3.select('#next').attr(
            'disabled', offset + ITEMS_PER_PAGE >= filteredTotal.value() ? "true" : null);
    }

    function updateTable() {
        table.beginSlice(offset);
        table.endSlice(offset+ITEMS_PER_PAGE);
        updatePaginationElements();
    }
    updateTable();

    function revertToFirstPageIfNeeded() {
        if (filteredTotal.value() !== previousFilteredTotalValue) {
            offset = 0;
            previousFilteredTotalValue = filteredTotal.value();
            updateTable();
            table.redraw();
        }
    }
    table.on('renderlet', revertToFirstPageIfNeeded);

    function next() {
        offset += ITEMS_PER_PAGE;
        updateTable();
        table.redraw();
    }
    $('#next').on('click', next);
    function previous() {
        offset -= ITEMS_PER_PAGE;
        updateTable();
        table.redraw();
    }
    $('#previous').on('click', previous);
}
