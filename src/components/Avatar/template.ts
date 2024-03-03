export default
`<div class="avatar {{#if isBig}}avatar_big{{/if}}">
    <img src="{{src}}" alt="Avatar">
    {{#if canEdit}}
      <label class="avatar__edit-button">
        <img src="/user-edit.svg" alt="Edit">
        <input type="file" name="avatar">
      </label>
    {{/if}}
</div>`;
