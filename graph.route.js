/**
 * Created by zcfrank1st on 9/12/14.
 */
angular
    .module('graph.route', [])
    .directive('route', [function () {
        return {
            templateUrl: '../template/template.html',
            restrict: 'E',
            scope: {
                node: '=',
                edge: '=',
                layout: '='
            },
            link: function (scope) {
                var nodedata = scope.node || [{node: 'in', label: '50%'}, {node: 'pay',label:'20%'}];
                var edgedata = scope.edge || [{node1: 'in', node2:'pay', label: 'transefer'}, {node1: 'pay', node2:'in', label: 'untransefer'}];

                var g = new dagreD3.Digraph();

                /** Node Unit Data
                 * {
                 *      node : 'samplename',
                 *      label : 'samplelabel'
                 * }
                 *
                 * [{},{},{}]
                */
                for (var i = 0; i < nodedata.length; i++) {
                    g.addNode(nodedata[i].node, { label: nodedata[i].label });
                }

                /** Edge Date
                 * {
                 *      node1: 'samplename1',
                 *      node2: 'samplename2',
                 *      label: 'samplelabel'
                 * }
                 * [{},{},{}]
                */
                for (var j = 0; j < edgedata.length; j++) {
                    g.addEdge(null, edgedata[j].node1, edgedata[j].node2, { label: edgedata[j].label });
                }


                var renderer = new dagreD3.Renderer();
                var layout = dagreD3.layout()
                    .rankDir(scope.layout ||"TB"); // or default
                renderer
                    .layout(layout)
                    .run(g, d3.select("svg g"));
            }
        }
    }]);
