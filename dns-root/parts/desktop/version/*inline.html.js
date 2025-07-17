return `<span id=update-control onclick="console.log('check for updates here')">
 <span class="label">Check for updates</span>
</span><hr><span id=version tabIndex=6>
 <span class="label">Version:</span>
 <a id="tags" href="https://github.com/kireji-app/alpha/tree/${_.gitSHA}" onclick="window.open(this.href, '_blank')">${[
  _.version,
  ...(_.branch === "main" ? [] : [_.branch])
 ].map(tag => `<span>${tag}</span>`).join("")}</a>
</span>`