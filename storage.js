"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Width = exports.WhiteSpace = exports.Top = exports.TextAlign = exports.Right = exports.MarginLeft = exports.Margin = exports.Left = exports.Bottom = exports.S = exports.Position = exports.Overflow = exports.Order = exports.Opacity = exports.MinWidth = exports.MinHeight = exports.MaxWidth = exports.LineHeight = exports.JustifySelf = exports.JustifyItems = exports.JustifyContent = exports.Height = exports.GridTemplateColumns = exports.FontWeight = exports.FontSize = exports.FlexWrap = exports.FlexShrink = exports.FlexGrow = exports.FlexDirection = exports.FlexBasis = exports.Flex = exports.Display = exports.Cursor = exports.BorderRadius = exports.Border = exports.AspectRatio = exports.AlignSelf = exports.AlignItems = exports.AlignContent = exports.SelfPosition = exports.DisplayOutside = exports.DisplayLegacy = exports.DisplayInternal = exports.DisplayInside = exports.DisplayBox = exports.ContentPosition = exports.ContentDistribution = void 0;
// https://drafts.csswg.org/css-align/#typedef-content-distribution
exports.ContentDistribution = ['space-around', 'space-between', 'space-evenly', 'stretch'];
// https://drafts.csswg.org/css-align/#typedef-content-position
exports.ContentPosition = ['center', 'end', 'flex-end', 'flex-start', 'start'];
// https://drafts.csswg.org/css-display-3/#typedef-display-box
exports.DisplayBox = ['contents', 'none'];
// https://drafts.csswg.org/css-display-3/#typedef-display-inside
exports.DisplayInside = ['flex', 'grid'];
// https://drafts.csswg.org/css-display-3/#typedef-display-internal
exports.DisplayInternal = [];
// https://drafts.csswg.org/css-display-3/#typedef-display-legacy
exports.DisplayLegacy = ['inline-block', 'inline-flex', 'inline-grid'];
// https://drafts.csswg.org/css-display-3/#typedef-display-outside
exports.DisplayOutside = ['block', 'inline'];
// https://drafts.csswg.org/css-align/#typedef-self-position
exports.SelfPosition = ['center', 'end', 'flex-end', 'flex-start', 'self-end', 'self-start', 'start'];
/**
 * Properties
 */
// https://drafts.csswg.org/css-align/#propdef-align-content
exports.AlignContent = ['baseline', ...exports.ContentDistribution, ...exports.ContentPosition];
// https://drafts.csswg.org/css-align/#propdef-align-items
exports.AlignItems = ['baseline', 'stretch', ...exports.SelfPosition];
// https://drafts.csswg.org/css-align/#propdef-align-self
exports.AlignSelf = ['baseline', 'stretch', ...exports.SelfPosition];
exports.AspectRatio = ['1/1', '16/9', ...exports.SelfPosition];
exports.Border = ['0', '1', '2'];
exports.BorderRadius = ['0', '1', '2', '3', '50'];
exports.Cursor = ['pointer', 'zoom-in', 'zoom-out'];
// https://drafts.csswg.org/css-display-3/#propdef-display
exports.Display = [
    ...exports.DisplayBox,
    ...exports.DisplayInside,
    ...exports.DisplayInternal,
    ...exports.DisplayLegacy,
    ...exports.DisplayOutside,
];
// https://drafts.csswg.org/css-flexbox-1/#propdef-flex
exports.Flex = ['1', 'none'];
exports.FlexBasis = [
    '0',
    '1/12',
    '2/12',
    '3/12',
    '4/12',
    '5/12',
    '6/12',
    '7/12',
    '8/12',
    '9/12',
    '10/12',
    '11/12',
    '100',
    'auto',
];
// https://drafts.csswg.org/css-flexbox-1/#propdef-flex-direction
exports.FlexDirection = ['column', 'column-reverse', 'row', 'row-reverse'];
exports.FlexGrow = ['0', '1'];
exports.FlexShrink = ['0', '1'];
// https://drafts.csswg.org/css-flexbox-1/#propdef-flex-wrap
exports.FlexWrap = ['nowrap', 'wrap', 'wrap-reverse'];
exports.FontSize = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
exports.FontWeight = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
exports.GridTemplateColumns = ['1', '2', '3', '4'];
exports.Height = ['0', '25', '50', '75', '100', 'auto'];
// https://drafts.csswg.org/css-align/#propdef-justify-content
exports.JustifyContent = ['left', 'right', ...exports.ContentDistribution, ...exports.ContentPosition];
// https://drafts.csswg.org/css-align/#propdef-justify-items
exports.JustifyItems = ['baseline', 'stretch', ...exports.SelfPosition];
// https://drafts.csswg.org/css-align/#propdef-justify-self
exports.JustifySelf = ['baseline', 'stretch', ...exports.SelfPosition];
exports.LineHeight = ['1', '2', '3', '4', '5'];
exports.MaxWidth = ['#', '##', '###', '####'];
exports.MinHeight = ['25', '50', '75', '100'];
exports.MinWidth = exports.FlexBasis;
exports.Opacity = ['0', '25', '50', '75', '100'];
exports.Order = ['first', 'last'];
exports.Overflow = ['auto', 'hidden'];
exports.Position = ['absolute', 'fixed', 'relative', 'static', 'sticky'];
/**
 * Spacing
 */
exports.S = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '16', '32', '64'];
exports.Bottom = ['0', '50', '100'];
exports.Left = ['0', '50', '100'];
exports.Margin = ['!1', '!2', '!3', '!4', '!5', '!6', '!7', '!8', '!16', '!32', '!64', 'auto', ...exports.S];
exports.MarginLeft = [
    '1/12',
    '2/12',
    '3/12',
    '4/12',
    '5/12',
    '6/12',
    '7/12',
    '8/12',
    '9/12',
    '10/12',
    '11/12',
    ...exports.Margin,
];
exports.Right = ['0', '50', '100'];
exports.TextAlign = ['center', 'end', 'justify', 'left', 'right', 'start'];
exports.Top = ['0', '50', '100'];
exports.WhiteSpace = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'];
exports.Width = exports.FlexBasis;
