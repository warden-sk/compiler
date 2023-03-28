/*
 * Copyright 2023 Marek Kobida
 */

// https://drafts.csswg.org/css-align/#typedef-content-distribution
export const ContentDistribution = ['space-around', 'space-between', 'space-evenly', 'stretch'] as const;
// https://drafts.csswg.org/css-align/#typedef-content-position
export const ContentPosition = ['center', 'end', 'flex-end', 'flex-start', 'start'] as const;
// https://drafts.csswg.org/css-display-3/#typedef-display-box
export const DisplayBox = ['contents', 'none'] as const;
// https://drafts.csswg.org/css-display-3/#typedef-display-inside
export const DisplayInside = ['flex', 'grid'] as const;
// https://drafts.csswg.org/css-display-3/#typedef-display-internal
export const DisplayInternal = [] as const;
// https://drafts.csswg.org/css-display-3/#typedef-display-legacy
export const DisplayLegacy = ['inline-block', 'inline-flex', 'inline-grid'] as const;
// https://drafts.csswg.org/css-display-3/#typedef-display-outside
export const DisplayOutside = ['block', 'inline'] as const;
// https://drafts.csswg.org/css-align/#typedef-self-position
export const SelfPosition = ['center', 'end', 'flex-end', 'flex-start', 'self-end', 'self-start', 'start'] as const;
/**
 * Properties
 */
// https://drafts.csswg.org/css-align/#propdef-align-content
export const AlignContent = ['baseline', ...ContentDistribution, ...ContentPosition] as const;
// https://drafts.csswg.org/css-align/#propdef-align-items
export const AlignItems = ['baseline', 'stretch', ...SelfPosition] as const;
// https://drafts.csswg.org/css-align/#propdef-align-self
export const AlignSelf = ['baseline', 'stretch', ...SelfPosition] as const;
export const Border = ['0', '1', '2'] as const;
export const BorderRadius = ['0', '1', '2', '50'] as const;
export const Cursor = ['pointer'] as const;
// https://drafts.csswg.org/css-display-3/#propdef-display
export const Display = [
  ...DisplayBox,
  ...DisplayInside,
  ...DisplayInternal,
  ...DisplayLegacy,
  ...DisplayOutside,
] as const;
// https://drafts.csswg.org/css-flexbox-1/#propdef-flex
export const Flex = ['1', 'none'] as const;
export const FlexBasis = [
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
] as const;
// https://drafts.csswg.org/css-flexbox-1/#propdef-flex-direction
export const FlexDirection = ['column', 'column-reverse', 'row', 'row-reverse'] as const;
// https://drafts.csswg.org/css-flexbox-1/#propdef-flex-wrap
export const FlexWrap = ['nowrap', 'wrap', 'wrap-reverse'] as const;
export const FontSize = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
export const FontWeight = ['100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
export const GridTemplateColumns = ['1', '2', '3', '4'] as const;
export const Height = ['0', '25', '50', '75', '100', 'auto'] as const;
// https://drafts.csswg.org/css-align/#propdef-justify-content
export const JustifyContent = ['left', 'right', ...ContentDistribution, ...ContentPosition] as const;
// https://drafts.csswg.org/css-align/#propdef-justify-items
export const JustifyItems = ['baseline', 'stretch', ...SelfPosition] as const;
// https://drafts.csswg.org/css-align/#propdef-justify-self
export const JustifySelf = ['baseline', 'stretch', ...SelfPosition] as const;
export const LineHeight = ['1', '2', '3', '4', '5'] as const;
export const Opacity = ['0', '25', '50', '75', '100'] as const;
/**
 * Spacing
 */
export const S = ['0', '1', '2', '3', '4', '5', '6', '7', '8'] as const;
export const Margin = ['!1', '!2', '!3', '!4', '!5', '!6', '!7', '!8', 'auto', ...S] as const;
export const MarginLeft = [
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
  ...Margin,
] as const;
export const TextAlign = ['center', 'end', 'justify', 'left', 'right', 'start'] as const;
export const WhiteSpace = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'] as const;
export const Width = FlexBasis;
