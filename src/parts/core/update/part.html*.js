return `<span id=update-control onclick=self._?.noop(event) onpointerdown="${update.runtimeReference}.go(event)">
 <span class="label">Check for updates</span>
</span><hr><span id=version tabIndex=0>
 <span class="label">Version:</span>
 <a id="tags" href="https://github.com/kireji-app/demo/tree/${_.gitSHA}" onclick=self._?.noop(event) onpointerdown="window.open(this.href, '_blank')" target="_blank">${_.version}</a>
</span>`