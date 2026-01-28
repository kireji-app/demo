return `<span ${update.pointAttr()} id=update-control>
 <span class="label">Check for updates</span>
</span><hr><span id=version tabIndex=0>
 <span class="label">Version:</span>
 <a ${_.pointAttr()} class="external" id="tags" href="https://github.com/kireji-app/demo/tree/${_.gitSHA}">${_.version}</a>
</span>`