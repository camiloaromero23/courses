from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)

posts = {
    0: {
        'post_id': 0,
        'title': 'Hello world',
        'content': 'This is my first blog post!'
    }
}


@app.route('/')
def home():
    return render_template('home.html', posts=posts)


@app.route('/post/<int:post_id>')
def post(post_id):
    # return f"Post {post['title']}, content:\n\n{post['content']}"
    post = posts.get(post_id)
    if not post:
        return render_template('404.html', message=f'Post with id {post_id} not found.')
    return render_template('post.html', post=post)


@app.route('/post/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')
        post_id = len(posts)
        posts[post_id] = {'id': post_id, 'title': title, 'content': content}
        return redirect(url_for('post', post_id=post_id))
    return render_template('create.html')


if __name__ == '__main__':
    app.run(debug=True)
