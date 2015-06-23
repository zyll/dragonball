var Guy = require('../www/js/guybrush.js')
  , $ = require('jquery');

describe('a guybrush instance', function() {
  beforeEach(function() {
    this.$el = $('<div>');
    $('body').append(this.$el);
    this.guy = Guy(this.$el);
  });
  afterEach(function() {
    this.$el.remove();
  });
  describe('when a complete triangle touch', function() {
    beforeEach(function(done) {
      this.spy = sinon.spy();
      this.guy.tap(this.spy).each(function() {console.log();done();});
      this.$el.trigger($.Event('touchstart', {
        originalEvent: {
          changedTouches: [
            {pageX: 10, pageY: 10, identifier: 0},
            {pageX: 10, pageY: 20, identifier: 2},
            {pageX: 20, pageY: 20, identifier: 1}
          ]
        }
      }));
    });
    it('stream one pawns with 3 point', function() {
      expect(this.spy).to.have.been.calledOnce;
      expect(this.spy.args[0][0]).to.be.an('array').with.length(1);
      console.log(this.spy.args[0][0][0]);
      expect(this.spy.args[0][0][0]).to.be.an('array').with.length(3);
    });
  });
});
