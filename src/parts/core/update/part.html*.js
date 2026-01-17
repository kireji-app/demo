return `<span id=update-control onpointerdown="${update.runtimeReference}.point(event,this)">
 <span class="label">Check for updates</span>
</span><hr><span id=version tabIndex=0>
 <span class="label">Version:</span>
 <a id="tags" href="https://github.com/kireji-app/demo/tree/${_.gitSHA}" onpointerdown="console.log('use new pointer handling for this'); window.open(this.href,'_blank')" target="_blank">${_.version}</a>
</span>`