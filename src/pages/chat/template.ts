export default
`
<aside class="chats-panel">
  {{{profileLink}}}
  <div class="chats-panel__search">
    <label for="search" class="chats-panel__search-label">
      <img src="/search.svg" alt="Поиск"/>
    </label>
    <input id="search" class="chats-panel__search-input" name="search_query" type="text" placeholder="Поиск"/>
  </div>
  <ul class="chats-panel__chats">
    {{{chats}}}
  </ul>
</aside>
<main class="chat">
  <div class="chat__info">
    {{{avatar}}}
    <p class="chat__name">{{name}}</p>
    <button class="chat__menu-button"><img src="/menu.svg" alt="Еще"/></button>
  </div>
  <ul class="chat__messages">
    <li class="chat__date-separator">
      <span>19 июня</span>
    </li>
    {{{messages}}}
  </ul>
  <form class="message-panel" id='{{formId}}'>
    {{{attachButton}}}
    {{{messageInput}}}
    {{{sendButton}}}
  </form>
</main>
`;
