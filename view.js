class View {
    _d = new Date();
    _renderingArea = document.querySelector('.issues-container');

    _getNumberOfDays(date) {
        return Math.ceil(Math.abs(this._d - date) / (1000 * 60 * 60 * 24));
    }
    _getHTML(eachObject) {
        console.log(eachObject);
        const markup = `
        <div class="issue">
          <div class="status">
            <div>${eachObject.state === 'open' ? '🟢' : '🔴'}</div>
          </div>
          <div class="description">
            <div class="issue-title">
              <a href="${eachObject.url}">${eachObject.title}</a>
            </div>
            <div class="id_time">#${eachObject.number} opened ${this._getNumberOfDays(new Date(eachObject.updated_at))} days ago by <a href="${eachObject.user.url}">${eachObject.user.login}</a></div>
          </div>
          <div class="assignee">
            <div class="${eachObject.assignee ? '' : 'hideImg'}">
                <a href=""><img src="${eachObject.assignee?.avatar_url ? eachObject.assignee.avatar_url : ''}" ></a>
            </div>
          </div>
          <div class="comments">
            <div>
            ${eachObject.comments > 0 ? "💬" : ""} ${eachObject.comments > 0 ? eachObject.comments : ""}
            </div>
          </div>
        </div >
    `;
        this._renderingArea.insertAdjacentHTML('beforeend', markup);
    }

    renderMarkupUsingData(data) {
        this._renderingArea.innerHTML = '';
        data.forEach(element => {
            this._getHTML(element);
        });
    }

}
export default new View();