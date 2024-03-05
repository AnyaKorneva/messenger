export default
`
{{#if label}}{{label}}{{/if}}
<input
  {{#if id}}id="{{id}}"{{/if}}
  {{#if value}}value="{{value}}"{{/if}}
  {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
  required="{{required}}"
  name="{{name}}"
  type="{{type}}"
/>
{{#if withError}}<span id="error_{{name}}" class="error hide"></span>{{/if}}
`;
