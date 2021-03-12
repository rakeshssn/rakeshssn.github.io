
//=================================================================================================================  company update ===============================
//============================================================================================================================================================

    window.onload = function() {
		
        
        document.getElementById("filter-microsoft").onclick = function() {
            updatebar("microsoft");
            updateWordcloud("microsoft");
           
         // Do your stuff here
        };
        document.getElementById("filter-apple").onclick = function() {
            updatebar("apple");
            updateWordcloud("apple");
          
         // Do your stuff here
        };
        document.getElementById("filter-facebook").onclick = function() {
            updatebar("facebook");
            updateWordcloud("facebook");
           
         // Do your stuff here
        };
      
        

        document.getElementById("updateButton").onclick = function() {
            updateAll()
            // Do your stuff here
        };
		setTimeout(function(){
        introJs().start();    
    }, 2000); 
   };




function redrawbar(data){

    document.getElementById("ratingbar").innerHTML = "";
    drawRatingBar(data);

}

function updateWordcloud(company){
    document.getElementById("wordcloud").innerHTML = "";
    drawWordCloud(filtered_data, company, '#wordcloud', 370, 250);
    document.getElementById("wordcloud-title").innerHTML = "Pros & Cons ("+company+")";

}

function redrawDonut(data){

     document.getElementById("half-donut-microsoft").innerHTML = "";
     document.getElementById("half-donut-facebook").innerHTML = "";
     document.getElementById("half-donut-apple").innerHTML = "";
   

    
    document.getElementById("comments").style.display = 'none';
        
    drawHalfDonut(data);

}

function updatebubble(data){
    document.getElementById("bubble").innerHTML = "";
    circle_pack(data);
}



var load_data;
var filtered_data;
var parseDate2 = d3.timeParse(" %b %e, %Y");
var formatTime = d3.timeFormat("%b %e, %Y");
var company = "microsoft";
d3.csv('data/employee_reviews_processed.csv', function(error, data) {
    if (error) throw error;
    data.forEach(function(d) {
                        d.dates = parseDate2(d.dates);});
    load_data = data;
    filtered_data = filter_data(data);
    
    
    circle_pack(filtered_data);
    drawWordCloud(filtered_data, 'microsoft', '#wordcloud', 370, 250);
    drawRatingBar(filtered_data);
    drawHalfDonut(counts_and_most_helpful_texts(filtered_data));
    

});



function drawHalfDonut(modified_data)
{

  
    comment_facebook = []
    comment_apple = []
    
   
    comment_microsoft = []
    allcomment = []

    var companies = [ 'apple', 'facebook',  'microsoft'];

    for(var j=0 ; j<3; j++)
    {
        var commentpositive = ""
        var commentnegative = ""
        var commentneutral = ""

        for (var i = 0 ; i< 5  ; i++)
        {
            if(i <  modified_data[companies[j]]['top_5_positive'].length)
            {
                commentpositive = commentpositive +"<span style=\"font-weight:450\">Comments: </span>"+ modified_data[companies[j]]['top_5_positive'][i]['summary'] + "<br> <span style=\"font-weight:450\">Helpful Count: </span>" + modified_data[companies[j]]['top_5_positive'][i]['helpful-count'] + "<br><br>";
            }
              
            if( i< modified_data[companies[j]]['top_5_neutral'].length)
            {
                commentneutral = commentneutral +"<span style=\"font-weight:450\">Comments: </span>"+ modified_data[companies[j]]['top_5_neutral'][i]['summary'] + "<br> <span style=\"font-weight:450\">Helpful Count: </span>" + modified_data[companies[j]]['top_5_neutral'][i]['helpful-count'] + "<br><br>";
            }
            if(i<  modified_data[companies[j]]['top_5_negative'].length)
            {
                commentnegative = commentnegative +"<span style=\"font-weight:450\">Comments: </span>"+ modified_data[companies[j]]['top_5_negative'][i]['summary'] + "<br> <span style=\"font-weight:450\">Helpful Count: </span>" + modified_data[companies[j]]['top_5_negative'][i]['helpful-count'] + "<br><br>";
            }
          

            
        }   
        
        var tempall =  [];
        tempall.push(commentpositive);
        tempall.push(commentneutral);
        tempall.push(commentnegative);
        allcomment.push(tempall);
        
    }

    
    
    comment_apple = allcomment[2]
    comment_facebook = allcomment[1]
  
    comment_microsoft = allcomment[0]
   



    positive_facebook = modified_data['facebook']['positive_count'] 
    negative_facebook = modified_data['facebook']['negative_count'] 
    neutral_facebook = modified_data['facebook']['neutral_count'] 

    positive_microsoft = modified_data['microsoft']['positive_count'] 
    negative_microsoft = modified_data['microsoft']['negative_count'] 
    neutral_microsoft = modified_data['microsoft']['neutral_count'] 

    positive_apple = modified_data['apple']['positive_count'] 
    negative_apple = modified_data['apple']['negative_count'] 
    neutral_apple = modified_data['apple']['neutral_count'] 



    sum_facebook = positive_facebook+negative_facebook+neutral_facebook
    sum_microsoft = positive_microsoft+negative_microsoft+neutral_microsoft
  
    sum_apple = positive_apple+negative_apple+neutral_apple


    


    var data_facebook = [
        {name: "Positive", val: positive_facebook/sum_facebook, count: positive_facebook},
        {name: "Neutral", val: neutral_facebook/sum_facebook, count: neutral_facebook},
        {name: "Negetive", val: negative_facebook/sum_facebook, count: negative_facebook}
    ];

    var data_microsoft = [
        {name: "Positive", val: positive_microsoft/sum_microsoft, count: positive_microsoft},
        {name: "Neutral", val: neutral_microsoft/sum_microsoft, count: neutral_microsoft},
        {name: "Negetive", val: negative_microsoft/sum_microsoft, count: negative_microsoft}
    ];

    


    var data_apple = [
        {name: "Positive", val: positive_apple/sum_apple, count: positive_apple},
        {name: "Neutral", val: neutral_apple/sum_apple, count: neutral_apple},
        {name: "Negetive", val: negative_apple/sum_apple, count: negative_apple}
    ];

   


    
    //===============================================================================================  half donut setting  ==============================

    div = d3.select("body")
            .append("div") 
            .attr("class", "tooltip");

    var w = 170,
        h = 90,
        r = Math.min(w, h) / 2,
        labelr = r + 50, // radius for label anchor
        color = ["#2ce480", "#919191", "#f44242"],
        textcolor = ["#45ab53", "#4e4e4e", "#bd0000"]
        donut = d3.pie()
            .startAngle(-90 * (Math.PI/180))
            .endAngle(90 * (Math.PI/180))

        arc = d3.arc()
            .innerRadius(r * .6)
            .outerRadius(r);

        mousearc = d3.arc()
            .innerRadius(r * .6)
            .outerRadius(r*1.1);

    var check = 0;
            
        

  //=========================================================================================================  microsoft  ===============================

    var vis1 = d3.select("#half-donut-microsoft")
        .append("svg:svg")
        .data([data_microsoft])
        .style("width", w )
        .style("height", h)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "20 -8 110 50")
        .classed("svg-content-responsive", true); 

    var arcs = vis1.selectAll("g.arc")
        .data(donut.value(function (d) {
            return d.val
        }).sort(null))
        .enter().append("svg:g")
        .attr("class", "arc")
        .attr("transform", "translate(" + (r + 30) + "," + r + ")")
        .on("mousemove",function(d){
            var mouseVal = d3.mouse(this);
            div.style("display","none");
            div
            .html(d.data.name+": "+ (d.data.val*100).toFixed(1)+"%")
            .style("left", (d3.event.pageX+12) + "px")
            .style("top", (d3.event.pageY-10) + "px")
            .style("opacity", 1)
            .style("display","block");

        })
        .on("mouseout",function(){div.html(" ").style("display","none");

        })
  

    arcs.append("svg:path")
        .attr("fill", function (d, i) {
            return color[i];
        })
        .attr("d", arc)
        .attr("class", "stroke")
        .attr("stroke-width", "0px")
        .attr("stroke", "black")
        .on("mouseenter", function(d, i) {
            if(check == 0)
            {
                d3.select(this)
               .transition()
               .duration(500)
               .attr("d", mousearc) ; 
               d3.select(".label.microsoft").text((d.value*100).toFixed(1)+"%");
               d3.select(".label.microsoft").attr("fill", textcolor[i]);
               updatebar("microsoft")
            }
                       
               
        })
        .on("mouseleave", function(d) {
            if(check == 0)
            {
                d3.select(this).transition()            
               .attr("d", arc);
               d3.select(".label.microsoft").text((data_microsoft[0].val*100).toFixed(1)+"%");
               d3.select(".label.microsoft").attr("fill", textcolor[0]);
               
               
            }
           
        })
        .on("click",function(d,i){
            if(d3.select(this).attr("stroke-width") == "0px")
            {
                if(check == 0)
                {
                    d3.select(this).attr("stroke-width","2px") 
                                .transition()
                                .duration(500)
                                .attr("d", mousearc)  ; 
                    document.getElementById("comments").style.display = 'block';
                    document.getElementById("comment_text").innerHTML = comment_microsoft[i];
                    document.getElementById("comment_title").innerHTML = 'Microsoft Top-5 ' + d.data.name + ' Comments';


                    check = 1;
                }
                
                
            }else {
                if(check == 1)
                {
                    d3.select(this).attr("stroke-width","0px");
                    document.getElementById("comments").style.display = 'none';
                    check = 0;
                }
                
            }

        });

        
    

    vis1.append("svg:text")
        .attr("transform", "translate(" + (r + 30) + "," + (r-30) + ")")
        .text( (data_microsoft[0].val*100).toFixed(1)+"%")
        .attr("dy", "3rem")
        .attr("fill", textcolor[0]) 
        .attr("class", "label microsoft")
        .attr("text-anchor", "middle")
     


    //=========================================================================================================  facebook  ===============================


    var vis2 = d3.select("#half-donut-facebook")
        .append("svg:svg")
        .data([data_facebook])
        .style("width", w )
        .style("height", h)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "20 -8 110 50")
        .classed("svg-content-responsive", true); 

    var arcs = vis2.selectAll("g.arc")
        .data(donut.value(function (d) {
            return d.val
        }).sort(null))
        .enter().append("svg:g")
        .attr("class", "arc")
        .attr("transform", "translate(" + (r + 30) + "," + r + ")")
        .on("mousemove",function(d){
            var mouseVal = d3.mouse(this);
            div.style("display","none");
            div
            .html(d.data.name+": "+ (d.data.val*100).toFixed(1)+"%")
            .style("left", (d3.event.pageX+12) + "px")
            .style("top", (d3.event.pageY-10) + "px")
            .style("opacity", 1)
            .style("display","block");

        })
        .on("mouseout",function(){div.html(" ").style("display","none");

        })
  

    arcs.append("svg:path")
        .attr("fill", function (d, i) {
            return color[i];
        })
        .attr("d", arc)
        .attr("class", "stroke")
        .attr("stroke-width", "0px")
        .attr("stroke", "black")
        .on("mouseenter", function(d, i) {
            if(check == 0)
            {
                d3.select(this)
               .transition()
               .duration(500)
               .attr("d", mousearc) ; 
               d3.select(".label.fb").text((d.value*100).toFixed(1)+"%");
               d3.select(".label.fb").attr("fill", textcolor[i]);
               updatebar("facebook")
            }
                       
               
        })
        .on("mouseleave", function(d) {
            if(check == 0)
            {
                d3.select(this).transition()            
               .attr("d", arc);
               d3.select(".label.fb").text((data_facebook[0].val*100).toFixed(1)+"%");
               d3.select(".label.fb").attr("fill", textcolor[0]);
               
               
            }
           
        })
        .on("click",function(d,i){
            if(d3.select(this).attr("stroke-width") == "0px")
            {
                if(check == 0)
                {
                    d3.select(this).attr("stroke-width","2px") 
                                .transition()
                                .duration(500)
                                .attr("d", mousearc)  ; 
                    document.getElementById("comments").style.display = 'block';
                    document.getElementById("comment_text").innerHTML = comment_facebook[i];
                    document.getElementById("comment_title").innerHTML = 'facebook Top-5 ' + d.data.name + ' Comments';
                    check = 1;
                }
                
                
            }else {
                if(check == 1)
                {
                    d3.select(this).attr("stroke-width","0px");
                    document.getElementById("comments").style.display = 'none';
                    check = 0;
                }
                
            }

        });

        
    

    vis2.append("svg:text")
        .attr("transform", "translate(" + (r + 30) + "," + (r-30) + ")")
        .text( (data_facebook[0].val*100).toFixed(1)+"%")
        .attr("dy", "3rem")
        .attr("fill", textcolor[0]) 
        .attr("class", "label fb")
        .attr("text-anchor", "middle")





 //=========================================================================================================  apple  ===============================


    var vis3 = d3.select("#half-donut-apple")
        .append("svg:svg")
        .data([data_apple])
        .style("width", w )
        .style("height", h)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "20 -8 110 50")
        .classed("svg-content-responsive", true); 

    var arcs = vis3.selectAll("g.arc")
        .data(donut.value(function (d) {
            return d.val
        }).sort(null))
        .enter().append("svg:g")
        .attr("class", "arc")
        .attr("transform", "translate(" + (r + 30) + "," + r + ")")
        .on("mousemove",function(d){
            var mouseVal = d3.mouse(this);
            div.style("display","none");
            div
            .html(d.data.name+": "+ (d.data.val*100).toFixed(1)+"%")
            .style("left", (d3.event.pageX+12) + "px")
            .style("top", (d3.event.pageY-10) + "px")
            .style("opacity", 1)
            .style("display","block");

        })
        .on("mouseout",function(){div.html(" ").style("display","none");

        })
  

    arcs.append("svg:path")
        .attr("fill", function (d, i) {
            return color[i];
        })
        .attr("d", arc)
        .attr("class", "stroke")
        .attr("stroke-width", "0px")
        .attr("stroke", "black")
        .on("mouseenter", function(d, i) {
            if(check == 0)
            {
                d3.select(this)
               .transition()
               .duration(500)
               .attr("d", mousearc) ; 
               d3.select(".label.apple").text((d.value*100).toFixed(1)+"%");
               d3.select(".label.apple").attr("fill", textcolor[i]);
            }
                       
               
        })
        .on("mouseleave", function(d,i) {
            if(check == 0)
            {
                d3.select(this).transition()            
               .attr("d", arc);
               d3.select(".label.apple").text((data_apple[0].val*100).toFixed(1)+"%");
               d3.select(".label.apple").attr("fill", textcolor[0]);
               updatebar("apple")
               
            }
           
        })
        .on("click",function(d,i){
            if(d3.select(this).attr("stroke-width") == "0px")
            {
                if(check == 0)
                {
                    d3.select(this).attr("stroke-width","2px") 
                                .transition()
                                .duration(500)
                                .attr("d", mousearc)  ; 
                    document.getElementById("comments").style.display = 'block';
                    document.getElementById("comment_text").innerHTML = comment_apple[i];
                    document.getElementById("comment_title").innerHTML = 'Apple Top-5 ' + d.data.name + ' Comments';
                    check = 1;
                }
                
                
            }else {
                if(check == 1)
                {
                    d3.select(this).attr("stroke-width","0px");
                    document.getElementById("comments").style.display = 'none';
                    check = 0;
                }
                
            }

        });

        
    

    vis3.append("svg:text")
        .attr("transform", "translate(" + (r + 30) + "," + (r-30) + ")")
        .text( (data_apple[0].val*100).toFixed(1)+"%")
        .attr("dy", "3rem")
        .attr("fill", textcolor[0]) 
        .attr("class", "label apple")
        .attr("text-anchor", "middle")

} 
   
//================================================================================================================  rating bar =============================
//==========================================================================================================================================================

function updatebar(changecompany)
    {
        company = changecompany;
        const margin = 60;
        const width = 500 - 2 * margin;
        const height = 250 - 2 * margin;


        const yScale = d3.scaleLinear()
          .range([height, 0])
          .domain([0, 5]);

            d3.selectAll(".bar")
                    .transition()
                    .attr('height', (g) => height - yScale(g[company]))
                    .attr('y', (g) => yScale(g[company]))


         d3.selectAll(".value")
                .transition()
                .attr('y', (a) => yScale(a[company]) + 40)
                .attr('text-anchor', 'middle')
                .text((a) => a[company])

        d3.selectAll(".title")
                .transition()
                .text("Ratings of "+company)

    }

 company = "microsoft"

function drawRatingBar(data)
{
    const barcolor = d3.scaleOrdinal().range(["#66d6ae", "#64a5bb", "#fdd782", "#fdad96" , '#df96fd' , "#7c674a"]);


    const data_rating = get_average_ratings(data);


    const svg = d3.select('#ratingbar');
    const svgContainer = d3.select('#ratingbarContainer');
    
    const margin = 60;
    const width = 500 - 2 * margin;
    const height = 250 - 2 * margin;

    const chart = svg.append('g')
      .attr('transform', 'translate(' + margin +',' + margin +')');

    const xScale = d3.scaleBand()
      .range([0, width])
      //.domain(sample.map((s) => s.name))
      .domain(data_rating.map((s) => s.name))
      .padding(0.9);

    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 5]);


    const makeYLines = () => d3.axisLeft()
      .scale(yScale)


    chart.append('g')
      .call(d3.axisLeft(yScale));


    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

    const barGroups = chart.selectAll()
      .data(data_rating)
      .enter()
      .append('g')


    barGroups
      .append('rect')
      
      .attr('class', 'bar')
      .attr('x', (a) => xScale(a.name) - 16 )
      .attr('y', (g) => yScale(g[company]))
      .attr('height', (g) => height - yScale(g[company]))
      .attr('width', width / 10)

      .style("fill", function(d, i) {
            return barcolor(i) ;
        })
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.name) - 16 )
          .attr('width', width / 10)

        const y = yScale(actual[company])

        line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a[company]) + 40)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a[company] - actual[company]).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}`

            return idx !== i ? text : '';
          })

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.name) - 16 )
          .attr('width', width / 10)

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })


     barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a[company]) + 40)
      .attr('text-anchor', 'middle')
      .text((a) => `${a[company]}`)

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Rate (1-5)')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.5)
      .attr('text-anchor', 'middle')
      .text('Overall Rating')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text("Ratings of "+company)


}
    


//================================================================================================================  bubble =============================
//==========================================================================================================================================================

function aspect_json(data){
	var companies = [ 'apple', 'facebook',  'microsoft'];
	var aspects = ['people','environment','benefits','pay','culture','opportunities','time','management']
	var synonyms = ['people', 'environment', 'benefits', 'salary', 'culture', 'opportunity','hours', 'management']
	var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";
	var result_company = []
	for (var i = 0; i < companies.length; i++) {
		var company_result = {'name':companies[i], }
		var cur_company_data = data.filter(function (d) {
			return d.company == companies[i];
		});
		var pros = cur_company_data.map(a => a['pros']).join('|');
		var cons = cur_company_data.map(a => a['cons']).join('|');
		var summary = cur_company_data.map(a => a['summary']).join('|');
		var all = pros.concat(cons, summary)
		all = all.split(/[.,|]/);
		var result_aspect = [];
		for (var x = 0; x < aspects.length; x++) {
			contain_aspect = all.filter(e => ((e.includes(aspects[x]))||(e.includes(synonyms[x]))));
			tokenized = contain_aspect.join(' ').split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
			var word_count = {};
			if (tokenized.length == 1){
				word_count[tokenized[0]] = 1;
			} else {
				tokenized.forEach(function(word){
					var word = word.toLowerCase();
					if (word != "" && common.indexOf(word)==-1 && word.length>1 && isNaN(word)){
						if (word_count[word]){
							word_count[word]++;
						} else {
							word_count[word] = 1;
						}
					}
				})
			}
			var above_count = cur_company_data.length/100;
			word_count = Object.keys(word_count).reduce(function (filtered, key) {
				if (word_count[key] > above_count) filtered[key] = word_count[key];
				return filtered;
			}, {});
			result_count = []
			for (var key in word_count) {
				var to_tag = new Lexer().lex(key);
				var taggedWords = new POSTagger().tag(to_tag);
				if (taggedWords[0][1].includes('JJ')){
					result_count.push({'name': key, 'size' : word_count[key]});
				}
			}
			result_aspect.push({'name':aspects[x], 'children':result_count});
		}
		result_company.push({'name':companies[i],'children':result_aspect});
	}
	var result = {'name': 'result', 'children':result_company};
	return result;
}

function circle_pack(data){
	var root = aspect_json(data);
	var svg = d3.select('#bubble'),
    margin = 3,
    diameter = +svg.attr("width")-90,
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

	var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

	var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

	root = d3.hierarchy(root)
	.sum(function(d) { return d.size; })
	.sort(function(a, b) { return b.value - a.value; });

	var focus = root,
	nodes = pack(root).descendants(),
	view;
	
	var circle = g.selectAll("circle")
	.data(nodes)
	.enter().append("circle")
	.attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
	.style("fill", function(d) { return d.children ? color(d.depth) : null; })
	.on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

	var text = g.selectAll("text")
	.data(nodes)
	.enter().append("text")
	.attr("class", "label")
	.attr('id', 'bubbletext')
	.style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
	.style("display", function(d) { return d.parent === root ? "inline" : "none"; })
	.text(function(d) {
			if (typeof d.data.size === "undefined") {
				return d.data.name
			} else {
				return d.data.name+': '+d.data.size; 
			}});

	var node = g.selectAll("circle,text");

	svg
	.style("background", color(-1))
	.on("click", function() { zoom(root); });

	zoomTo([root.x, root.y, root.r * 2 + margin]);

	function zoom(d) {
		var focus0 = focus; focus = d;

		var transition = d3.transition()
		.duration(d3.event.altKey ? 7500 : 750)
		.tween("zoom", function(d) {
		var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
			return function(t) { zoomTo(i(t)); };
		});

		transition.selectAll("#bubbletext")
		.filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
		.style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
		.on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
		.on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
	}

	function zoomTo(v) {
		var k = diameter / v[2]; view = v;
		node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
		circle.attr("r", function(d) { return d.r * k; });
	}
}


//================================================================================================================  wordcloud =============================
//==========================================================================================================================================================



function drawWordCloud(data, company, svg_location, width, height){
    var company_data = data.filter(function (d) {
        return d.company == company;
    });
    var pros = company_data.map(a => a['pros']).join(' ')
    var cons = company_data.map(a => a['cons']).join(' ')
    var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

    var word_count = {};
    var word_count2 = {};

    var words = pros.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    var words2 = cons.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    if (words.length == 1){
        word_count[words[0]] = 1;
    } else {
        words.forEach(function(word){
            var word = word.toLowerCase();
            if (word != "" && common.indexOf(word)==-1 && word.length>1 && isNaN(word)){
                if (word_count[word]){
                    word_count[word]++;
                } else {
                    word_count[word] = 1;
                }
            }
        })
    }
    if (words2.length == 1){
        word_count2[words2[0]] = 1;
    } else {
        words2.forEach(function(word){
            var word = word.toLowerCase();
            if (word != "" && common.indexOf(word)==-1 && word.length>1 && isNaN(word)){
                if (word_count2[word]){
                    word_count2[word]++;
                } else {
                    word_count2[word] = 1;
                }
            }
        })
    }
	var above_count = company_data.length / 100;
    word_count = Object.keys(word_count).reduce(function (filtered, key) {
        if (word_count[key] > above_count) filtered[key] = word_count[key];
        return filtered;
    }, {});
    word_count2 = Object.keys(word_count2).reduce(function (filtered, key) {
        if (word_count2[key] > above_count) filtered[key] = word_count2[key];
        return filtered;
    }, {});
    var word_entries = d3.entries(word_count);
    var word_entries2 = d3.entries(word_count2);
    for (var i = 0; i < word_entries.length; i++) {
        word_entries[i]['fill'] = 'LightSeaGreen';
    }
    for (var i = 0; i < word_entries2.length; i++) {
        word_entries2[i]['fill'] = 'LightCoral ';
    }
    word_entries3 = word_entries.concat(word_entries2);
    
    var max = d3.max(word_entries3, function(d) {
                  return +d.value;
                });
    var xScale = d3.scaleLinear()
       .domain([0,max])
       .range([10,100]);
       
    d3.layout.cloud().size([width, height])
      .timeInterval(20)
      .words(word_entries3)
      .fontSize(function(d) { return xScale(+d.value); })
      .text(function(d) { return d.key; })
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .on("end", draw)
      .start();
    function draw(words) {
      d3.select(svg_location).append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
		.transition()
		.duration(750)
          .style("font-size", function(d) { return xScale(d.value) + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return d.fill; })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.key; });
    }

    d3.layout.cloud().stop();
}


//================================================================================================================ load  data function  =============================
//==========================================================================================================================================================


function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = Number(arr[0]);
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (Number(arr[i]) > max) {
            maxIndex = i;
            max = Number(arr[i]);
        }
    }
    return maxIndex;
}



function filter_data(data){
    return data;
}

function top_5_data(data){
    var temp = [];
    for(var i=0  ;i< data.length && i<5 ; i++)
    {
        temp.push(data[i])

    }
    return temp;
}

function counts_and_most_helpful_texts(data){
    var companies = [ 'apple', 'facebook', 'microsoft'];
    var result = {};
    data=data.sort(function(a, b){return b['helpful-count'] - a['helpful-count']});
    for (var i = 0; i < companies.length; i++) {
        var cur_company_data = data.filter(function (d) {
            return d.company == companies[i];
        });
        var cur_positive_data = cur_company_data.filter(function (d) {
            return d.summarysentiment == "Positive";
        });

        var cur_neutral_data = cur_company_data.filter(function (d) {
            return d.summarysentiment == "Neutral";
        });
        var cur_negative_data = cur_company_data.filter(function (d) {
            return d.summarysentiment == "Negative";
        });
        result[companies[i]] = {};
        result[companies[i]]['positive_count'] = cur_positive_data.length;
        result[companies[i]]['negative_count'] = cur_negative_data.length;
        result[companies[i]]['neutral_count'] = cur_neutral_data.length;
        result[companies[i]]['most_helpful_positive'] = cur_positive_data[indexOfMax(cur_positive_data.map(a => a['helpful-count']))];
        result[companies[i]]['most_helpful_negative'] = cur_negative_data[indexOfMax(cur_negative_data.map(a => a['helpful-count']))];
        result[companies[i]]['most_helpful_neutral'] = cur_neutral_data[indexOfMax(cur_neutral_data.map(a => a['helpful-count']))];
        result[companies[i]]['top_5_positive'] = top_5_data(cur_positive_data);
        result[companies[i]]['top_5_negative'] = top_5_data(cur_negative_data);
        result[companies[i]]['top_5_neutral'] = top_5_data(cur_neutral_data);
    }
    
    return result;
}


function get_average_ratings(data){
    var companies = ['amazon', 'apple', 'facebook', 'google', 'microsoft', 'netflix'];
    var col_names = ['overall-ratings'];
    var custom_col_names = ['Overall'];
    var mean_col_names = ['mean-overall-ratings'];
    var result = {};
    var processed_results = [];    
	
	
	
	
	
    for (var i = 0; i < companies.length; i++) {
        var cur_company_data = data.filter(function (d) {
            return d.company == companies[i];
        });
        result[companies[i]] = {};
        for (var n = 0; n < col_names.length; n++){
            cur_column = cur_company_data.map(a => a[col_names[n]]);
            cur_column = cur_column.filter(e => e !== 'none');
            var sum, avg = 0;
            if (cur_column.length)  // dividing by 0 will return Infinity
            {
                sum = cur_column.reduce(function(a, b) { return Number(a) + Number(b); });
                avg = sum / cur_column.length;
            }
            new_col_name = 'mean-'.concat(col_names[n]);
            result[companies[i]][new_col_name] =  avg.toFixed(1);
        }
    }
    for (var i = 0; i < mean_col_names.length; i++) {
        


       processed_results = processed_results.concat({ "name" : col_names[i], "amazon" : result[companies[i]][mean_col_names[i]] , "apple" : result["apple"][mean_col_names[i]], "facebook" : result["facebook"][mean_col_names[i]], "google" : result["google"][mean_col_names[i]], "microsoft" : result["microsoft"][mean_col_names[i]],"netflix" : result["netflix"][mean_col_names[i]], })


    }

    return processed_results;
}

 
//=========================================================================================================================================
//=========================================================================================================================  slider  ===========

    var parseTime = d3.timeParse("%Y-%m-%d");
    var parseDate = d3.timeParse("%b %e, %Y");
    var formatTime = d3.timeFormat("%b %e, %Y");

    var startDate = new Date(parseDate("Mar 21, 2011")).valueOf();
    var endDate = new Date(parseDate("Nov 27, 2018")).valueOf();

    var sliderValues

// Add jQuery UI slider
    $("#date-slider").slider({
        range: true,
        min: startDate,
        max: endDate,
        step: 86400000, // One day
        values: [startDate, endDate],
        slide: function(event, ui){
            $("#dateLabel1").text(formatTime(new Date(ui.values[0])));
            $("#dateLabel2").text(formatTime(new Date(ui.values[1])));
        }
    });


    function updateAll() {

        
        // Filter data based on selections
        sliderValues = $("#date-slider").slider("values");

        if( (document.getElementById('formerEmp').checked) &&  (document.getElementById('currentEmp').checked)){
                filtered_data = load_data.filter(function(d){
                                                return ((d.dates >= sliderValues[0]) && (d.dates <= sliderValues[1]))
                                            });

                updateWordcloud(company);
              
                redrawbar(filtered_data);
                modified_data = counts_and_most_helpful_texts(filtered_data);
                redrawDonut(modified_data);
                updatebubble(filtered_data);
        
        }else if (document.getElementById('formerEmp').checked){
            filtered_data = load_data.filter(function(d){
                                                return ((d.dates >= sliderValues[0]) && (d.dates <= sliderValues[1]) && d.Current_Emp == "False")
                                            });

                updateWordcloud(company);
                
                redrawbar(filtered_data);
                modified_data = counts_and_most_helpful_texts(filtered_data);
                redrawDonut(modified_data);
                updatebubble(filtered_data);

        }else if (document.getElementById('currentEmp').checked) {
             filtered_data = load_data.filter(function(d){
                                                return ((d.dates >= sliderValues[0]) && (d.dates <= sliderValues[1]) && d.Current_Emp == "True")
                                            });

                updateWordcloud(company);
             
                redrawbar(filtered_data);
                modified_data = counts_and_most_helpful_texts(filtered_data);
                redrawDonut(modified_data);
                updatebubble(filtered_data);
				
				
		}else if (document.getElementById("brand").value="Audi") {
             filtered_data = load_data.filter(function(d){
                                                return ((d.dates >= sliderValues[0]) && (d.dates <= sliderValues[1]) && d.Current_Emp == "True")
                                            });

                updateWordcloud(company);
             
                redrawbar(filtered_data);
                modified_data = counts_and_most_helpful_texts(filtered_data);
                redrawDonut(modified_data);
                updatebubble(filtered_data);		
				
				
        }else alert("Please Select Atleast ONE Employee Type!!!")



        

        

       
    }