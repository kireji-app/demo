return `<span id=update-control onclick="_.parts.desktop.update.go(event)">
 <span class="label">Check for updates</span>
</span><hr><span id=version tabIndex=6>
 <span class="label">Version:</span>
 <a id="tags" href="https://github.com/kireji-app/demo/tree/${_.gitSHA}" onclick="window.open(this.href, '_blank')" target="_blank">${_.version}</a>
</span>`