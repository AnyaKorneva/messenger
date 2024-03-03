export default
`
{{{ avatar }}}
<div>
  <div class="chat-preview__name">{{ name }}</div>
  <div class="chat-preview__text">
    {{ message }}
  </div>
</div>
<div>
  <div class="chat-preview__time">{{ time }}</div>
  {{#if notification}}
    <div class="chat-preview__notification-wrapper">
      <span class="chat-preview__notification">{{ notification }}</span>
    </div>
  {{/if}}
</div>
<div class="chat-preview__separator"></div>
`;
