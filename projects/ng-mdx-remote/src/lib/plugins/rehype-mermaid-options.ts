import { VFile } from 'vfile';

export interface BaseDiagramConfig {
    useWidth?: number;
    /**
     * When this flag is set to `true`, the height and width is set to 100%
     * and is then scaled with the available space.
     * If set to `false`, the absolute space required is used.
     *
     */
    useMaxWidth?: boolean;
}

export interface FlowchartDiagramConfig extends BaseDiagramConfig {
    /**
     * Margin top for the text over the diagram
     */
    titleTopMargin?: number;
    /**
     * Defines a top/bottom margin for subgraph titles
     *
     */
    subGraphTitleMargin?: {
        top?: number;
        bottom?: number;
    };
    arrowMarkerAbsolute?: boolean;
    /**
     * The amount of padding around the diagram as a whole so that embedded
     * diagrams have margins, expressed in pixels.
     *
     */
    diagramPadding?: number;
    /**
     * Flag for setting whether or not a html tag should be used for rendering labels on the edges.
     *
     */
    htmlLabels?: boolean;
    /**
     * Defines the spacing between nodes on the same level
     *
     * Pertains to horizontal spacing for TB (top to bottom) or BT (bottom to top) graphs,
     * and the vertical spacing for LR as well as RL graphs.
     *
     */
    nodeSpacing?: number;
    /**
     * Defines the spacing between nodes on different levels
     *
     * Pertains to horizontal spacing for TB (top to bottom) or BT (bottom to top) graphs,
     * and the vertical spacing for LR as well as RL graphs.
     *
     */
    rankSpacing?: number;
    /**
     * Defines how mermaid renders curves for flowcharts.
     *
     */
    curve?: string | 'basis' | 'linear' | 'cardinal';
    /**
     * Represents the padding between the labels and the shape
     *
     * **Only used in new experimental rendering.**
     *
     */
    padding?: number;
    /**
     * Decides which rendering engine that is to be used for the rendering.
     *
     */
    defaultRenderer?: string | 'dagre-d3' | 'dagre-wrapper' | 'elk';
    /**
     * Width of nodes where text is wrapped.
     *
     * When using markdown strings the text ius wrapped automatically, this
     * value sets the max width of a text before it continues on a new line.
     *
     */
    wrappingWidth?: number;
}

export interface SequenceDiagramConfig extends BaseDiagramConfig {
    arrowMarkerAbsolute?: boolean;
    hideUnusedParticipants?: boolean;
    /**
     * Width of the activation rect
     */
    activationWidth?: number;
    /**
     * Margin to the right and left of the sequence diagram
     */
    diagramMarginX?: number;
    /**
     * Margin to the over and under the sequence diagram
     */
    diagramMarginY?: number;
    /**
     * Margin between actors
     */
    actorMargin?: number;
    /**
     * Width of actor boxes
     */
    width?: number;
    /**
     * Height of actor boxes
     */
    height?: number;
    /**
     * Margin around loop boxes
     */
    boxMargin?: number;
    /**
     * Margin around the text in loop/alt/opt boxes
     */
    boxTextMargin?: number;
    /**
     * Margin around notes
     */
    noteMargin?: number;
    /**
     * Space between messages.
     */
    messageMargin?: number;
    /**
     * Multiline message alignment
     */
    messageAlign?: string | 'left' | 'center' | 'right';
    /**
     * Mirror actors under diagram
     *
     */
    mirrorActors?: boolean;
    /**
     * forces actor popup menus to always be visible (to support E2E testing).
     *
     */
    forceMenus?: boolean;
    /**
     * Prolongs the edge of the diagram downwards.
     *
     * Depending on css styling this might need adjustment.
     *
     */
    bottomMarginAdj?: number;
    /**
     * Curved Arrows become Right Angles
     *
     * This will display arrows that start and begin at the same node as
     * right angles, rather than as curves.
     *
     */
    rightAngles?: boolean;
    /**
     * This will show the node numbers
     */
    showSequenceNumbers?: boolean;
    /**
     * This sets the font size of the actor's description
     */
    actorFontSize?: string | number;
    /**
     * This sets the font family of the actor's description
     */
    actorFontFamily?: string;
    /**
     * This sets the font weight of the actor's description
     */
    actorFontWeight?: string | number;
    /**
     * This sets the font size of actor-attached notes
     */
    noteFontSize?: string | number;
    /**
     * This sets the font family of actor-attached notes
     */
    noteFontFamily?: string;
    /**
     * This sets the font weight of actor-attached notes
     */
    noteFontWeight?: string | number;
    /**
     * This sets the text alignment of actor-attached notes
     */
    noteAlign?: string | 'left' | 'center' | 'right';
    /**
     * This sets the font size of actor messages
     */
    messageFontSize?: string | number;
    /**
     * This sets the font family of actor messages
     */
    messageFontFamily?: string;
    /**
     * This sets the font weight of actor messages
     */
    messageFontWeight?: string | number;
    /**
     * This sets the auto-wrap state for the diagram
     */
    wrap?: boolean;
    /**
     * This sets the auto-wrap padding for the diagram (sides only)
     */
    wrapPadding?: number;
    /**
     * This sets the width of the loop-box (loop, alt, opt, par)
     */
    labelBoxWidth?: number;
    /**
     * This sets the height of the loop-box (loop, alt, opt, par)
     */
    labelBoxHeight?: number;
    messageFont?: FontCalculator;
    noteFont?: FontCalculator;
    actorFont?: FontCalculator;
}

export interface GanttDiagramConfig extends BaseDiagramConfig {
    /**
     * Margin top for the text over the diagram
     */
    titleTopMargin?: number;
    /**
     * The height of the bars in the graph
     */
    barHeight?: number;
    /**
     * The margin between the different activities in the gantt diagram
     */
    barGap?: number;
    /**
     * Margin between title and gantt diagram and between axis and gantt diagram.
     *
     */
    topPadding?: number;
    /**
     * The space allocated for the section name to the right of the activities
     *
     */
    rightPadding?: number;
    /**
     * The space allocated for the section name to the left of the activities
     *
     */
    leftPadding?: number;
    /**
     * Vertical starting position of the grid lines
     */
    gridLineStartPadding?: number;
    /**
     * Font size
     */
    fontSize?: number;
    /**
     * Font size for sections
     */
    sectionFontSize?: string | number;
    /**
     * The number of alternating section styles
     */
    numberSectionStyles?: number;
    /**
     * Date/time format of the axis
     *
     * This might need adjustment to match your locale and preferences.
     *
     */
    axisFormat?: string;
    /**
     * axis ticks
     *
     * Pattern is:
     *
     * ```javascript
     * /^([1-9][0-9]*)(millisecond|second|minute|hour|day|week|month)$/
     * ```
     *
     */
    tickInterval?: string;
    /**
     * When this flag is set, date labels will be added to the top of the chart
     *
     */
    topAxis?: boolean;
    /**
     * Controls the display mode.
     *
     */
    displayMode?: string | 'compact';
    /**
     * On which day a week-based interval should start
     *
     */
    weekday?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
}

export type CSSFontSize = string | number;

export interface FontConfig {
    fontSize?: CSSFontSize;
    /**
     * The CSS [`font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) to use.
     */
    fontFamily?: string;
    /**
     * The font weight to use.
     */
    fontWeight?: string | number;
}

export type FontCalculator = () => Partial<FontConfig>;

export interface SequenceDiagramConfig extends BaseDiagramConfig {
    arrowMarkerAbsolute?: boolean;
    hideUnusedParticipants?: boolean;
    /**
     * Width of the activation rect
     */
    activationWidth?: number;
    /**
     * Margin to the right and left of the sequence diagram
     */
    diagramMarginX?: number;
    /**
     * Margin to the over and under the sequence diagram
     */
    diagramMarginY?: number;
    /**
     * Margin between actors
     */
    actorMargin?: number;
    /**
     * Width of actor boxes
     */
    width?: number;
    /**
     * Height of actor boxes
     */
    height?: number;
    /**
     * Margin around loop boxes
     */
    boxMargin?: number;
    /**
     * Margin around the text in loop/alt/opt boxes
     */
    boxTextMargin?: number;
    /**
     * Margin around notes
     */
    noteMargin?: number;
    /**
     * Space between messages.
     */
    messageMargin?: number;
    /**
     * Multiline message alignment
     */
    messageAlign?: string | 'left' | 'center' | 'right';
    /**
     * Mirror actors under diagram
     *
     */
    mirrorActors?: boolean;
    /**
     * forces actor popup menus to always be visible (to support E2E testing).
     *
     */
    forceMenus?: boolean;
    /**
     * Prolongs the edge of the diagram downwards.
     *
     * Depending on css styling this might need adjustment.
     *
     */
    bottomMarginAdj?: number;
    /**
     * Curved Arrows become Right Angles
     *
     * This will display arrows that start and begin at the same node as
     * right angles, rather than as curves.
     *
     */
    rightAngles?: boolean;
    /**
     * This will show the node numbers
     */
    showSequenceNumbers?: boolean;
    /**
     * This sets the font size of the actor's description
     */
    actorFontSize?: string | number;
    /**
     * This sets the font family of the actor's description
     */
    actorFontFamily?: string;
    /**
     * This sets the font weight of the actor's description
     */
    actorFontWeight?: string | number;
    /**
     * This sets the font size of actor-attached notes
     */
    noteFontSize?: string | number;
    /**
     * This sets the font family of actor-attached notes
     */
    noteFontFamily?: string;
    /**
     * This sets the font weight of actor-attached notes
     */
    noteFontWeight?: string | number;
    /**
     * This sets the text alignment of actor-attached notes
     */
    noteAlign?: string | 'left' | 'center' | 'right';
    /**
     * This sets the font size of actor messages
     */
    messageFontSize?: string | number;
    /**
     * This sets the font family of actor messages
     */
    messageFontFamily?: string;
    /**
     * This sets the font weight of actor messages
     */
    messageFontWeight?: string | number;
    /**
     * This sets the auto-wrap state for the diagram
     */
    wrap?: boolean;
    /**
     * This sets the auto-wrap padding for the diagram (sides only)
     */
    wrapPadding?: number;
    /**
     * This sets the width of the loop-box (loop, alt, opt, par)
     */
    labelBoxWidth?: number;
    /**
     * This sets the height of the loop-box (loop, alt, opt, par)
     */
    labelBoxHeight?: number;
    messageFont?: FontCalculator;
    noteFont?: FontCalculator;
    actorFont?: FontCalculator;
}
/**
 * The object containing configurations specific for flowcharts
 *
 * This interface was referenced by `MermaidConfig`'s JSON-Schema
 * via the `definition` "FlowchartDiagramConfig".
 */
export interface FlowchartDiagramConfig extends BaseDiagramConfig {
    /**
     * Margin top for the text over the diagram
     */
    titleTopMargin?: number;
    /**
     * Defines a top/bottom margin for subgraph titles
     *
     */
    subGraphTitleMargin?: {
        top?: number;
        bottom?: number;
    };
    arrowMarkerAbsolute?: boolean;
    /**
     * The amount of padding around the diagram as a whole so that embedded
     * diagrams have margins, expressed in pixels.
     *
     */
    diagramPadding?: number;
    /**
     * Flag for setting whether or not a html tag should be used for rendering labels on the edges.
     *
     */
    htmlLabels?: boolean;
    /**
     * Defines the spacing between nodes on the same level
     *
     * Pertains to horizontal spacing for TB (top to bottom) or BT (bottom to top) graphs,
     * and the vertical spacing for LR as well as RL graphs.
     *
     */
    nodeSpacing?: number;
    /**
     * Defines the spacing between nodes on different levels
     *
     * Pertains to horizontal spacing for TB (top to bottom) or BT (bottom to top) graphs,
     * and the vertical spacing for LR as well as RL graphs.
     *
     */
    rankSpacing?: number;
    /**
     * Defines how mermaid renders curves for flowcharts.
     *
     */
    curve?: string | 'basis' | 'linear' | 'cardinal';
    /**
     * Represents the padding between the labels and the shape
     *
     * **Only used in new experimental rendering.**
     *
     */
    padding?: number;
    /**
     * Decides which rendering engine that is to be used for the rendering.
     *
     */
    defaultRenderer?: string | 'dagre-d3' | 'dagre-wrapper' | 'elk';
    /**
     * Width of nodes where text is wrapped.
     *
     * When using markdown strings the text ius wrapped automatically, this
     * value sets the max width of a text before it continues on a new line.
     *
     */
    wrappingWidth?: number;
}
/**
 * The object containing configurations specific for sankey diagrams.
 *
 * This interface was referenced by `MermaidConfig`'s JSON-Schema
 * via the `definition` "SankeyDiagramConfig".
 */

export type SankeyLinkColor = 'source' | 'target' | 'gradient';

export interface SankeyDiagramConfig extends BaseDiagramConfig {
    width?: number;
    height?: number;
    /**
     * The color of the links in the sankey diagram.
     *
     */
    linkColor?: SankeyLinkColor | string;
    /**
     * Controls the alignment of the Sankey diagrams.
     *
     * See <https://github.com/d3/d3-sankey#alignments>.
     *
     */
    nodeAlignment?: 'left' | 'right' | 'center' | 'justify';
    useMaxWidth?: boolean;
    /**
     * Toggle to display or hide values along with title.
     *
     */
    showValues?: boolean;
    /**
     * The prefix to use for values
     *
     */
    prefix?: string;
    /**
     * The suffix to use for values
     *
     */
    suffix?: string;
}


export interface JourneyDiagramConfig extends BaseDiagramConfig {
    /**
     * Margin to the right and left of the c4 diagram, must be a positive value.
     *
     */
    diagramMarginX?: number;
    /**
     * Margin to the over and under the c4 diagram, must be a positive value.
     *
     */
    diagramMarginY?: number;
    /**
     * Margin between actors
     */
    leftMargin?: number;
    /**
     * Width of actor boxes
     */
    width?: number;
    /**
     * Height of actor boxes
     */
    height?: number;
    /**
     * Margin around loop boxes
     */
    boxMargin?: number;
    /**
     * Margin around the text in loop/alt/opt boxes
     */
    boxTextMargin?: number;
    /**
     * Margin around notes
     */
    noteMargin?: number;
    /**
     * Space between messages.
     */
    messageMargin?: number;
    /**
     * Multiline message alignment
     */
    messageAlign?: string | 'left' | 'center' | 'right';
    /**
     * Prolongs the edge of the diagram downwards.
     *
     * Depending on css styling this might need adjustment.
     *
     */
    bottomMarginAdj?: number;
    /**
     * Curved Arrows become Right Angles
     *
     * This will display arrows that start and begin at the same node as
     * right angles, rather than as curves.
     *
     */
    rightAngles?: boolean;
    taskFontSize?: string | number;
    taskFontFamily?: string;
    taskMargin?: number;
    /**
     * Width of activation box
     */
    activationWidth?: number;
    /**
     * text placement as: tspan | fo | old only text as before
     *
     */
    textPlacement?: string;
    actorColours?: string[];
    sectionFills?: string[];
    sectionColours?: string[];
}

export interface TimelineDiagramConfig extends BaseDiagramConfig {
    /**
     * Margin to the right and left of the c4 diagram, must be a positive value.
     *
     */
    diagramMarginX?: number;
    /**
     * Margin to the over and under the c4 diagram, must be a positive value.
     *
     */
    diagramMarginY?: number;
    /**
     * Margin between actors
     */
    leftMargin?: number;
    /**
     * Width of actor boxes
     */
    width?: number;
    /**
     * Height of actor boxes
     */
    height?: number;
    padding?: number;
    /**
     * Margin around loop boxes
     */
    boxMargin?: number;
    /**
     * Margin around the text in loop/alt/opt boxes
     */
    boxTextMargin?: number;
    /**
     * Margin around notes
     */
    noteMargin?: number;
    /**
     * Space between messages.
     */
    messageMargin?: number;
    /**
     * Multiline message alignment
     */
    messageAlign?: string | 'left' | 'center' | 'right';
    /**
     * Prolongs the edge of the diagram downwards.
     *
     * Depending on css styling this might need adjustment.
     *
     */
    bottomMarginAdj?: number;
    /**
     * Curved Arrows become Right Angles
     *
     * This will display arrows that start and begin at the same node as
     * right angles, rather than as curves.
     *
     */
    rightAngles?: boolean;
    taskFontSize?: string | number;
    taskFontFamily?: string;
    taskMargin?: number;
    /**
     * Width of activation box
     */
    activationWidth?: number;
    /**
     * text placement as: tspan | fo | old only text as before
     *
     */
    textPlacement?: string;
    actorColours?: string[];
    sectionFills?: string[];
    sectionColours?: string[];
    disableMulticolor?: boolean;
}

export interface ClassDiagramConfig extends BaseDiagramConfig {
    /**
     * Margin top for the text over the diagram
     */
    titleTopMargin?: number;
    /**
     * Controls whether or arrow markers in html code are absolute paths or anchors.
     * This matters if you are using base tag settings.
     *
     */
    arrowMarkerAbsolute?: boolean;
    dividerMargin?: number;
    padding?: number;
    textHeight?: number;
    /**
     * Decides which rendering engine that is to be used for the rendering.
     *
     */
    defaultRenderer?: string | 'dagre-d3' | 'dagre-wrapper' | 'elk';
    nodeSpacing?: number;
    rankSpacing?: number;
    /**
     * The amount of padding around the diagram as a whole so that embedded
     * diagrams have margins, expressed in pixels.
     *
     */
    diagramPadding?: number;
    htmlLabels?: boolean;
}

export interface StateDiagramConfig extends BaseDiagramConfig {
    /**
     * Margin top for the text over the diagram
     */
    titleTopMargin?: number;
    arrowMarkerAbsolute?: boolean;
    dividerMargin?: number;
    sizeUnit?: number;
    padding?: number;
    textHeight?: number;
    titleShift?: number;
    noteMargin?: number;
    forkWidth?: number;
    forkHeight?: number;
    miniPadding?: number;
    /**
     * Font size factor, this is used to guess the width of the edges labels
     * before rendering by dagre layout.
     * This might need updating if/when switching font
     *
     */
    fontSizeFactor?: number;
    fontSize?: number;
    labelHeight?: number;
    edgeLengthFactor?: string;
    compositTitleSize?: number;
    radius?: number;
    /**
     * Decides which rendering engine that is to be used for the rendering.
     *
     */
    defaultRenderer?: string | 'dagre-d3' | 'dagre-wrapper' | 'elk';
}

export interface ErDiagramConfig extends BaseDiagramConfig {
    /**
     * Margin top for the text over the diagram
     */
    titleTopMargin?: number;
    /**
     * The amount of padding around the diagram as a whole so that embedded
     * diagrams have margins, expressed in pixels.
     *
     */
    diagramPadding?: number;
    /**
     * Directional bias for layout of entities
     */
    layoutDirection?: string | 'TB' | 'BT' | 'LR' | 'RL';
    /**
     * The minimum width of an entity box. Expressed in pixels.
     */
    minEntityWidth?: number;
    /**
     * The minimum height of an entity box. Expressed in pixels.
     */
    minEntityHeight?: number;
    /**
     * The minimum internal padding between text in an entity box and the enclosing box borders.
     * Expressed in pixels.
     *
     */
    entityPadding?: number;
    /**
     * Stroke color of box edges and lines.
     */
    stroke?: string;
    /**
     * Fill color of entity boxes
     */
    fill?: string;
    /**
     * Font size (expressed as an integer representing a number of pixels)
     */
    fontSize?: number;
}

export interface PieDiagramConfig extends BaseDiagramConfig {
    /**
     * Axial position of slice's label from zero at the center to 1 at the outside edges.
     *
     */
    textPosition?: number;
}

export interface QuadrantChartConfig extends BaseDiagramConfig {
    /**
     * Width of the chart
     */
    chartWidth?: number;
    /**
     * Height of the chart
     */
    chartHeight?: number;
    /**
     * Chart title top and bottom padding
     */
    titleFontSize?: number;
    /**
     * Padding around the quadrant square
     */
    titlePadding?: number;
    /**
     * quadrant title padding from top if the quadrant is rendered on top
     */
    quadrantPadding?: number;
    /**
     * Padding around x-axis labels
     */
    xAxisLabelPadding?: number;
    /**
     * Padding around y-axis labels
     */
    yAxisLabelPadding?: number;
    /**
     * x-axis label font size
     */
    xAxisLabelFontSize?: number;
    /**
     * y-axis label font size
     */
    yAxisLabelFontSize?: number;
    /**
     * quadrant title font size
     */
    quadrantLabelFontSize?: number;
    /**
     * quadrant title padding from top if the quadrant is rendered on top
     */
    quadrantTextTopPadding?: number;
    /**
     * padding between point and point label
     */
    pointTextPadding?: number;
    /**
     * point title font size
     */
    pointLabelFontSize?: number;
    /**
     * radius of the point to be drawn
     */
    pointRadius?: number;
    /**
     * position of x-axis labels
     */
    xAxisPosition?: 'top' | 'bottom';
    /**
     * position of y-axis labels
     */
    yAxisPosition?: 'left' | 'right';
    /**
     * stroke width of edges of the box that are inside the quadrant
     */
    quadrantInternalBorderStrokeWidth?: number;
    /**
     * stroke width of edges of the box that are outside the quadrant
     */
    quadrantExternalBorderStrokeWidth?: number;
}

export interface XYChartAxisConfig1 {
    /**
     * Should show the axis labels (tick text)
     */
    showLabel?: boolean;
    /**
     * font size of the axis labels (tick text)
     */
    labelFontSize?: number;
    /**
     * top and bottom space from axis label (tick text)
     */
    labelPadding?: number;
    /**
     * Should show the axis title
     */
    showTitle?: boolean;
    /**
     * font size of the axis title
     */
    titleFontSize?: number;
    /**
     * top and bottom space from axis title
     */
    titlePadding?: number;
    /**
     * Should show the axis tick lines
     */
    showTick?: boolean;
    /**
     * length of the axis tick lines
     */
    tickLength?: number;
    /**
     * width of the axis tick lines
     */
    tickWidth?: number;
    /**
     * Show line across the axis
     */
    showAxisLine?: boolean;
    /**
     * Width of the axis line
     */
    axisLineWidth?: number;
}

export interface XYChartAxisConfig2 {
    /**
     * Should show the axis labels (tick text)
     */
    showLabel?: boolean;
    /**
     * font size of the axis labels (tick text)
     */
    labelFontSize?: number;
    /**
     * top and bottom space from axis label (tick text)
     */
    labelPadding?: number;
    /**
     * Should show the axis title
     */
    showTitle?: boolean;
    /**
     * font size of the axis title
     */
    titleFontSize?: number;
    /**
     * top and bottom space from axis title
     */
    titlePadding?: number;
    /**
     * Should show the axis tick lines
     */
    showTick?: boolean;
    /**
     * length of the axis tick lines
     */
    tickLength?: number;
    /**
     * width of the axis tick lines
     */
    tickWidth?: number;
    /**
     * Show line across the axis
     */
    showAxisLine?: boolean;
    /**
     * Width of the axis line
     */
    axisLineWidth?: number;
}

export interface XYChartConfig extends BaseDiagramConfig {
    /**
     * width of the chart
     */
    width?: number;
    /**
     * height of the chart
     */
    height?: number;
    /**
     * Font size of the chart title
     */
    titleFontSize?: number;
    /**
     * Top and bottom space from the chart title
     */
    titlePadding?: number;
    /**
     * Should show the chart title
     */
    showTitle?: boolean;
    xAxis?: XYChartAxisConfig1;
    yAxis?: XYChartAxisConfig2;
    /**
     * How to plot will be drawn horizontal or vertical
     */
    chartOrientation?: 'vertical' | 'horizontal';
    /**
     * Minimum percent of space plots of the chart will take
     */
    plotReservedSpacePercent?: number;
}

export interface RequirementDiagramConfig extends BaseDiagramConfig {
    rect_fill?: string;
    text_color?: string;
    rect_border_size?: string;
    rect_border_color?: string;
    rect_min_width?: number;
    rect_min_height?: number;
    fontSize?: number;
    rect_padding?: number;
    line_height?: number;
}

export interface MindmapDiagramConfig extends BaseDiagramConfig {
    padding?: number;
    maxNodeWidth?: number;
}

export interface NodeLabel {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}

export interface GitGraphDiagramConfig extends BaseDiagramConfig {
    /**
     * Margin top for the text over the diagram
     */
    titleTopMargin?: number;
    diagramPadding?: number;
    nodeLabel?: NodeLabel;
    mainBranchName?: string;
    mainBranchOrder?: number;
    showCommitLabel?: boolean;
    showBranches?: boolean;
    rotateCommitLabel?: boolean;
    parallelCommits?: boolean;
    /**
     * Controls whether or arrow markers in html code are absolute paths or anchors.
     * This matters if you are using base tag settings.
     *
     */
    arrowMarkerAbsolute?: boolean;
}

export interface C4DiagramConfig extends BaseDiagramConfig {
    /**
     * Margin to the right and left of the c4 diagram, must be a positive value.
     *
     */
    diagramMarginX?: number;
    /**
     * Margin to the over and under the c4 diagram, must be a positive value.
     *
     */
    diagramMarginY?: number;
    /**
     * Margin between shapes
     */
    c4ShapeMargin?: number;
    /**
     * Padding between shapes
     */
    c4ShapePadding?: number;
    /**
     * Width of person boxes
     */
    width?: number;
    /**
     * Height of person boxes
     */
    height?: number;
    /**
     * Margin around boxes
     */
    boxMargin?: number;
    /**
     * How many shapes to place in each row.
     */
    c4ShapeInRow?: number;
    nextLinePaddingX?: number;
    /**
     * How many boundaries to place in each row.
     */
    c4BoundaryInRow?: number;
    /**
     * This sets the font size of Person shape for the diagram
     */
    personFontSize?: string | number;
    /**
     * This sets the font weight of Person shape for the diagram
     */
    personFontFamily?: string;
    /**
     * This sets the font weight of Person shape for the diagram
     */
    personFontWeight?: string | number;
    /**
     * This sets the font size of External Person shape for the diagram
     */
    external_personFontSize?: string | number;
    /**
     * This sets the font family of External Person shape for the diagram
     */
    external_personFontFamily?: string;
    /**
     * This sets the font weight of External Person shape for the diagram
     */
    external_personFontWeight?: string | number;
    /**
     * This sets the font size of System shape for the diagram
     */
    systemFontSize?: string | number;
    /**
     * This sets the font family of System shape for the diagram
     */
    systemFontFamily?: string;
    /**
     * This sets the font weight of System shape for the diagram
     */
    systemFontWeight?: string | number;
    /**
     * This sets the font size of External System shape for the diagram
     */
    external_systemFontSize?: string | number;
    /**
     * This sets the font family of External System shape for the diagram
     */
    external_systemFontFamily?: string;
    /**
     * This sets the font weight of External System shape for the diagram
     */
    external_systemFontWeight?: string | number;
    /**
     * This sets the font size of System DB shape for the diagram
     */
    system_dbFontSize?: string | number;
    /**
     * This sets the font family of System DB shape for the diagram
     */
    system_dbFontFamily?: string;
    /**
     * This sets the font weight of System DB shape for the diagram
     */
    system_dbFontWeight?: string | number;
    /**
     * This sets the font size of External System DB shape for the diagram
     */
    external_system_dbFontSize?: string | number;
    /**
     * This sets the font family of External System DB shape for the diagram
     */
    external_system_dbFontFamily?: string;
    /**
     * This sets the font weight of External System DB shape for the diagram
     */
    external_system_dbFontWeight?: string | number;
    /**
     * This sets the font size of System Queue shape for the diagram
     */
    system_queueFontSize?: string | number;
    /**
     * This sets the font family of System Queue shape for the diagram
     */
    system_queueFontFamily?: string;
    /**
     * This sets the font weight of System Queue shape for the diagram
     */
    system_queueFontWeight?: string | number;
    /**
     * This sets the font size of External System Queue shape for the diagram
     */
    external_system_queueFontSize?: string | number;
    /**
     * This sets the font family of External System Queue shape for the diagram
     */
    external_system_queueFontFamily?: string;
    /**
     * This sets the font weight of External System Queue shape for the diagram
     */
    external_system_queueFontWeight?: string | number;
    /**
     * This sets the font size of Boundary shape for the diagram
     */
    boundaryFontSize?: string | number;
    /**
     * This sets the font family of Boundary shape for the diagram
     */
    boundaryFontFamily?: string;
    /**
     * This sets the font weight of Boundary shape for the diagram
     */
    boundaryFontWeight?: string | number;
    /**
     * This sets the font size of Message shape for the diagram
     */
    messageFontSize?: string | number;
    /**
     * This sets the font family of Message shape for the diagram
     */
    messageFontFamily?: string;
    /**
     * This sets the font weight of Message shape for the diagram
     */
    messageFontWeight?: string | number;
    /**
     * This sets the font size of Container shape for the diagram
     */
    containerFontSize?: string | number;
    /**
     * This sets the font family of Container shape for the diagram
     */
    containerFontFamily?: string;
    /**
     * This sets the font weight of Container shape for the diagram
     */
    containerFontWeight?: string | number;
    /**
     * This sets the font size of External Container shape for the diagram
     */
    external_containerFontSize?: string | number;
    /**
     * This sets the font family of External Container shape for the diagram
     */
    external_containerFontFamily?: string;
    /**
     * This sets the font weight of External Container shape for the diagram
     */
    external_containerFontWeight?: string | number;
    /**
     * This sets the font size of Container DB shape for the diagram
     */
    container_dbFontSize?: string | number;
    /**
     * This sets the font family of Container DB shape for the diagram
     */
    container_dbFontFamily?: string;
    /**
     * This sets the font weight of Container DB shape for the diagram
     */
    container_dbFontWeight?: string | number;
    /**
     * This sets the font size of External Container DB shape for the diagram
     */
    external_container_dbFontSize?: string | number;
    /**
     * This sets the font family of External Container DB shape for the diagram
     */
    external_container_dbFontFamily?: string;
    /**
     * This sets the font weight of External Container DB shape for the diagram
     */
    external_container_dbFontWeight?: string | number;
    /**
     * This sets the font size of Container Queue shape for the diagram
     */
    container_queueFontSize?: string | number;
    /**
     * This sets the font family of Container Queue shape for the diagram
     */
    container_queueFontFamily?: string;
    /**
     * This sets the font weight of Container Queue shape for the diagram
     */
    container_queueFontWeight?: string | number;
    /**
     * This sets the font size of External Container Queue shape for the diagram
     */
    external_container_queueFontSize?: string | number;
    /**
     * This sets the font family of External Container Queue shape for the diagram
     */
    external_container_queueFontFamily?: string;
    /**
     * This sets the font weight of External Container Queue shape for the diagram
     */
    external_container_queueFontWeight?: string | number;
    /**
     * This sets the font size of Component shape for the diagram
     */
    componentFontSize?: string | number;
    /**
     * This sets the font family of Component shape for the diagram
     */
    componentFontFamily?: string;
    /**
     * This sets the font weight of Component shape for the diagram
     */
    componentFontWeight?: string | number;
    /**
     * This sets the font size of External Component shape for the diagram
     */
    external_componentFontSize?: string | number;
    /**
     * This sets the font family of External Component shape for the diagram
     */
    external_componentFontFamily?: string;
    /**
     * This sets the font weight of External Component shape for the diagram
     */
    external_componentFontWeight?: string | number;
    /**
     * This sets the font size of Component DB shape for the diagram
     */
    component_dbFontSize?: string | number;
    /**
     * This sets the font family of Component DB shape for the diagram
     */
    component_dbFontFamily?: string;
    /**
     * This sets the font weight of Component DB shape for the diagram
     */
    component_dbFontWeight?: string | number;
    /**
     * This sets the font size of External Component DB shape for the diagram
     */
    external_component_dbFontSize?: string | number;
    /**
     * This sets the font family of External Component DB shape for the diagram
     */
    external_component_dbFontFamily?: string;
    /**
     * This sets the font weight of External Component DB shape for the diagram
     */
    external_component_dbFontWeight?: string | number;
    /**
     * This sets the font size of Component Queue shape for the diagram
     */
    component_queueFontSize?: string | number;
    /**
     * This sets the font family of Component Queue shape for the diagram
     */
    component_queueFontFamily?: string;
    /**
     * This sets the font weight of Component Queue shape for the diagram
     */
    component_queueFontWeight?: string | number;
    /**
     * This sets the font size of External Component Queue shape for the diagram
     */
    external_component_queueFontSize?: string | number;
    /**
     * This sets the font family of External Component Queue shape for the diagram
     */
    external_component_queueFontFamily?: string;
    /**
     * This sets the font weight of External Component Queue shape for the diagram
     */
    external_component_queueFontWeight?: string | number;
    /**
     * This sets the auto-wrap state for the diagram
     */
    wrap?: boolean;
    /**
     * This sets the auto-wrap padding for the diagram (sides only)
     */
    wrapPadding?: number;
    person_bg_color?: string;
    person_border_color?: string;
    external_person_bg_color?: string;
    external_person_border_color?: string;
    system_bg_color?: string;
    system_border_color?: string;
    system_db_bg_color?: string;
    system_db_border_color?: string;
    system_queue_bg_color?: string;
    system_queue_border_color?: string;
    external_system_bg_color?: string;
    external_system_border_color?: string;
    external_system_db_bg_color?: string;
    external_system_db_border_color?: string;
    external_system_queue_bg_color?: string;
    external_system_queue_border_color?: string;
    container_bg_color?: string;
    container_border_color?: string;
    container_db_bg_color?: string;
    container_db_border_color?: string;
    container_queue_bg_color?: string;
    container_queue_border_color?: string;
    external_container_bg_color?: string;
    external_container_border_color?: string;
    external_container_db_bg_color?: string;
    external_container_db_border_color?: string;
    external_container_queue_bg_color?: string;
    external_container_queue_border_color?: string;
    component_bg_color?: string;
    component_border_color?: string;
    component_db_bg_color?: string;
    component_db_border_color?: string;
    component_queue_bg_color?: string;
    component_queue_border_color?: string;
    external_component_bg_color?: string;
    external_component_border_color?: string;
    external_component_db_bg_color?: string;
    external_component_db_border_color?: string;
    external_component_queue_bg_color?: string;
    external_component_queue_border_color?: string;
    personFont?: FontCalculator;
    external_personFont?: FontCalculator;
    systemFont?: FontCalculator;
    external_systemFont?: FontCalculator;
    system_dbFont?: FontCalculator;
    external_system_dbFont?: FontCalculator;
    system_queueFont?: FontCalculator;
    external_system_queueFont?: FontCalculator;
    containerFont?: FontCalculator;
    external_containerFont?: FontCalculator;
    container_dbFont?: FontCalculator;
    external_container_dbFont?: FontCalculator;
    container_queueFont?: FontCalculator;
    external_container_queueFont?: FontCalculator;
    componentFont?: FontCalculator;
    external_componentFont?: FontCalculator;
    component_dbFont?: FontCalculator;
    external_component_dbFont?: FontCalculator;
    component_queueFont?: FontCalculator;
    external_component_queueFont?: FontCalculator;
    boundaryFont?: FontCalculator;
    messageFont?: FontCalculator;
}

export interface BlockDiagramConfig extends BaseDiagramConfig {
    padding?: number;
}

export type DOMPurifyConfiguration = any

export interface MermaidConfig {
    /**
     * Theme, the CSS style sheet.
     * You may also use `themeCSS` to override this value.
     *
     */
    theme?: string | 'default' | 'forest' | 'dark' | 'neutral' | 'null';
    themeVariables?: any;
    themeCSS?: string;
    /**
     * The maximum allowed size of the users text diagram
     */
    maxTextSize?: number;
    /**
     * Defines the maximum number of edges that can be drawn in a graph.
     *
     */
    maxEdges?: number;
    darkMode?: boolean;
    htmlLabels?: boolean;
    /**
     * Specifies the font to be used in the rendered diagrams.
     * Can be any possible CSS `font-family`.
     * See https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
     *
     */
    fontFamily?: string;
    altFontFamily?: string;
    /**
     * This option decides the amount of logging to be used by mermaid.
     *
     */
    logLevel?: number | string | 0 | 2 | 1 | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 3 | 4 | 5 | undefined;
    /**
     * Level of trust for parsed diagram
     */
    securityLevel?: string | 'strict' | 'loose' | 'antiscript' | 'sandbox' | undefined;
    /**
     * Dictates whether mermaid starts on Page load
     */
    startOnLoad?: boolean;
    /**
     * Controls whether or arrow markers in html code are absolute paths or anchors.
     * This matters if you are using base tag settings.
     *
     */
    arrowMarkerAbsolute?: boolean;
    /**
     * This option controls which `currentConfig` keys are considered secure and
     * can only be changed via call to `mermaidAPI.initialize`.
     * Calls to `mermaidAPI.reinitialize` cannot make changes to the secure keys
     * in the current `currentConfig`.
     *
     * This prevents malicious graph directives from overriding a site's default security.
     *
     */
    secure?: string[];
    /**
     * This option specifies if Mermaid can expect the dependent to include KaTeX stylesheets for browsers
     * without their own MathML implementation. If this option is disabled and MathML is not supported, the math
     * equations are replaced with a warning. If this option is enabled and MathML is not supported, Mermaid will
     * fall back to legacy rendering for KaTeX.
     *
     */
    legacyMathML?: boolean;
    /**
     * This option controls if the generated ids of nodes in the SVG are
     * generated randomly or based on a seed.
     * If set to `false`, the IDs are generated based on the current date and
     * thus are not deterministic. This is the default behavior.
     *
     * This matters if your files are checked into source control e.g. git and
     * should not change unless content is changed.
     *
     */
    deterministicIds?: boolean;
    /**
     * This option is the optional seed for deterministic ids.
     * If set to `undefined` but deterministicIds is `true`, a simple number iterator is used.
     * You can set this attribute to base the seed on a static string.
     *
     */
    deterministicIDSeed?: string;
    flowchart?: FlowchartDiagramConfig;
    sequence?: SequenceDiagramConfig;
    gantt?: GanttDiagramConfig;
    journey?: JourneyDiagramConfig;
    timeline?: TimelineDiagramConfig;
    class?: ClassDiagramConfig;
    state?: StateDiagramConfig;
    er?: ErDiagramConfig;
    pie?: PieDiagramConfig;
    quadrantChart?: QuadrantChartConfig;
    xyChart?: XYChartConfig;
    requirement?: RequirementDiagramConfig;
    mindmap?: MindmapDiagramConfig;
    gitGraph?: GitGraphDiagramConfig;
    c4?: C4DiagramConfig;
    sankey?: SankeyDiagramConfig;
    block?: BlockDiagramConfig;
    dompurifyConfig?: DOMPurifyConfiguration;
    wrap?: boolean;
    fontSize?: number;
}

export interface LaunchOptions {
    /**
     * **NOTE** Use custom browser args at your own risk, as some of them may break Playwright functionality.
     *
     * Additional arguments to pass to the browser instance. The list of Chromium flags can be found
     * [here](https://peter.sh/experiments/chromium-command-line-switches/).
     */
    args?: Array<string>;
  
    /**
     * Browser distribution channel.  Supported values are "chrome", "chrome-beta", "chrome-dev", "chrome-canary",
     * "msedge", "msedge-beta", "msedge-dev", "msedge-canary". Read more about using
     * [Google Chrome and Microsoft Edge](https://playwright.dev/docs/browsers#google-chrome--microsoft-edge).
     */
    channel?: string;
  
    /**
     * Enable Chromium sandboxing. Defaults to `false`.
     */
    chromiumSandbox?: boolean;
  
    /**
     * **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the
     * `headless` option will be set `false`.
     * @deprecated Use [debugging tools](https://playwright.dev/docs/debug) instead.
     */
    devtools?: boolean;
  
    /**
     * If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and
     * is deleted when browser is closed. In either case, the downloads are deleted when the browser context they were
     * created in is closed.
     */
    downloadsPath?: string;
  
    /**
     * Specify environment variables that will be visible to the browser. Defaults to `process.env`.
     */
    env?: { [key: string]: string|number|boolean; };
  
    /**
     * Path to a browser executable to run instead of the bundled one. If `executablePath` is a relative path, then it is
     * resolved relative to the current working directory. Note that Playwright only works with the bundled Chromium,
     * Firefox or WebKit, use at your own risk.
     */
    executablePath?: string;
  
    /**
     * Firefox user preferences. Learn more about the Firefox user preferences at
     * [`about:config`](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).
     */
    firefoxUserPrefs?: { [key: string]: string|number|boolean; };
  
    /**
     * Close the browser process on SIGHUP. Defaults to `true`.
     */
    handleSIGHUP?: boolean;
  
    /**
     * Close the browser process on Ctrl-C. Defaults to `true`.
     */
    handleSIGINT?: boolean;
  
    /**
     * Close the browser process on SIGTERM. Defaults to `true`.
     */
    handleSIGTERM?: boolean;
  
    /**
     * Whether to run browser in headless mode. More details for
     * [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and
     * [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the
     * `devtools` option is `true`.
     */
    headless?: boolean;
  
    /**
     * If `true`, Playwright does not pass its own configurations args and only uses the ones from `args`. If an array is
     * given, then filters out the given default arguments. Dangerous option; use with care. Defaults to `false`.
     */
    ignoreDefaultArgs?: boolean|Array<string>;
  
    /**
     * Logger sink for Playwright logging.
     */
    logger?: any
  
    /**
     * Network proxy settings.
     */
    proxy?: {
      /**
       * Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or
       * `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
       */
      server: string;
  
      /**
       * Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
       */
      bypass?: string;
  
      /**
       * Optional username to use if HTTP proxy requires authentication.
       */
      username?: string;
  
      /**
       * Optional password to use if HTTP proxy requires authentication.
       */
      password?: string;
    };
  
    /**
     * Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going
     * on.
     */
    slowMo?: number;
  
    /**
     * Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0`
     * to disable timeout.
     */
    timeout?: number;
  
    /**
     * If specified, traces are saved into this directory.
     */
    tracesDir?: string;
  }


export interface CreateMermaidRendererOptions {
    /**
     * The Playwright browser to use.
     *
     * @default chromium
     */
    browser?: any
  
    /**
     * The options used to launch the browser.
     */
    launchOptions?: LaunchOptions
  }
  
export interface RenderOptions {
/**
 * A URL that points to a custom CSS file to load.
 *
 * Use this to load custom fonts.
 *
 * This option is ignored in the browser. You need to include the CSS in your build manually.
 */
css?: Iterable<URL | string> | URL | string | undefined

/**
 * If true, a PNG screenshot of the diagram will be added.
 *
 * This is only supported in the Node.js.
 */
screenshot?: boolean

/**
 * The mermaid configuration.
 *
 * By default `fontFamily` is set to `arial,sans-serif`.
 *
 * This option is ignored in the browser. You need to call `mermaid.initialize()` manually.
 */
mermaidConfig?: MermaidConfig

/**
 * The prefix of the id.
 *
 * @default 'mermaid'
 */
prefix?: string | undefined
}

export interface RenderResult {
/**
 * The aria description of the diagram.
 */
description?: string

/**
 * The height of the resulting SVG.
 */
height: number

/**
 * The DOM id of the SVG node.
 */
id: string

/**
 * The diagram SVG rendered as a PNG buffer.
 */
screenshot?: Buffer

/**
 * The diagram rendered as an SVG.
 */
svg: string

/**
 * The title of the rendered diagram.
 */
title?: string

/**
 * The width of the resulting SVG.
 */
width: number
}

interface RenderDiagramsOptions
extends Required<Pick<RenderOptions, 'mermaidConfig' | 'prefix' | 'screenshot'>> {
/**
 * The diagrams to process.
 */
diagrams: string[]
}


export interface RenderOptions {
/**
 * A URL that points to a custom CSS file to load.
 *
 * Use this to load custom fonts.
 *
 * This option is ignored in the browser. You need to include the CSS in your build manually.
 */
css?: Iterable<URL | string> | URL | string | undefined

/**
 * If true, a PNG screenshot of the diagram will be added.
 *
 * This is only supported in the Node.js.
 */
screenshot?: boolean

/**
 * The mermaid configuration.
 *
 * By default `fontFamily` is set to `arial,sans-serif`.
 *
 * This option is ignored in the browser. You need to call `mermaid.initialize()` manually.
 */
mermaidConfig?: MermaidConfig

/**
 * The prefix of the id.
 *
 * @default 'mermaid'
 */
prefix?: string | undefined
}

export interface RenderOptions {
/**
 * A URL that points to a custom CSS file to load.
 *
 * Use this to load custom fonts.
 *
 * This option is ignored in the browser. You need to include the CSS in your build manually.
 */
css?: Iterable<URL | string> | URL | string | undefined

/**
 * If true, a PNG screenshot of the diagram will be added.
 *
 * This is only supported in the Node.js.
 */
screenshot?: boolean

/**
 * The mermaid configuration.
 *
 * By default `fontFamily` is set to `arial,sans-serif`.
 *
 * This option is ignored in the browser. You need to call `mermaid.initialize()` manually.
 */
mermaidConfig?: MermaidConfig

/**
 * The prefix of the id.
 *
 * @default 'mermaid'
 */
prefix?: string | undefined
}

type ColorScheme = 'dark' | 'light'

export type ElementContent = ElementContentMap[keyof ElementContentMap];

export interface ElementContentMap {
comment: Comment;
element: Element;
text: Text;
}

type Strategy = 'img-png' | 'img-svg' | 'inline-svg' | 'pre-mermaid'


export interface RehypeMermaidOptions
extends CreateMermaidRendererOptions,
Omit<RenderOptions, 'screenshot'> {
/**
 * If specified, add responsive dark mode using a `<picture>` element.
 *
 * This option is only supported by the `img-png` and `img-svg` strategies.
 */
dark?: RenderOptions['mermaidConfig'] | true

/**
 * The default color scheme.
 *
 * If not specified, `rehype-mermaid` will determine the color scheme based on the `color-scheme`
 * meta tag. If this doesn’t exist, the default color scheme is `light`.
 */
colorScheme?: ColorScheme

/**
 * Create a fallback node if processing of a mermaid diagram fails.
 *
 * @param element
 *   The hast element that could not be rendered.
 * @param diagram
 *   The Mermaid diagram that could not be rendered.
 * @param error
 *   The error that was thrown.
 * @param file
 *   The file on which the error occurred.
 * @returns
 *   A fallback node to render instead of the invalid diagram. If nothing is returned, the code
 *   block is removed
 */
errorFallback?: (
element: Element,
diagram: string,
error: unknown,
file: VFile
) => ElementContent | null | undefined | void

/**
 * How to insert the rendered diagram into the document.
 *
 * - `'img-png'`: An `<img>` tag with the diagram as a base64 PNG data URL.
 * - `'img-svg'`: An `<img>` tag with the diagram as an SVG data URL.
 * - `'inline-svg'`: The SVG image as an inline `<svg>` element.
 * - `'pre-mermaid'`: The raw mermaid diagram as a child of a `<pre class="mermaid">` element.
 *
 * @default 'inline-svg'
 */
strategy?: Strategy
}
