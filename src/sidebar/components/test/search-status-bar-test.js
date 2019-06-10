'use strict';

const angular = require('angular');

const uiConstants = require('../../ui-constants');
const util = require('../../directive/test/util');

describe('searchStatusBar', () => {
  before(() => {
    angular
      .module('app', [])
      .component('searchStatusBar', require('../search-status-bar'));
  });

  let fakeRootThread;
  let fakeStore;

  beforeEach(() => {
    fakeRootThread = {
      thread: sinon.stub(),
    };
    fakeStore = {
      getState: sinon.stub(),
      selectTab: sinon.stub(),
      clearSelectedAnnotations: sinon.stub(),
      clearDirectLinkedGroupFetchFailed: sinon.stub(),
      clearDirectLinkedIds: sinon.stub(),
    };
    angular.mock.module('app', {
      store: fakeStore,
      rootThread: fakeRootThread,
    });
  });

  describe('filterMatchCount', () => {
    it('returns the total number of visible annotations or replies', () => {
      fakeRootThread.thread.returns({
        children: [
          {
            id: '1',
            visible: true,
            children: [{ id: '3', visible: true, children: [] }],
          },
          {
            id: '2',
            visible: false,
            children: [],
          },
        ],
      });

      const elem = util.createDirective(document, 'searchStatusBar', {
        filterActive: true,
      });
      const ctrl = elem.ctrl;

      assert.equal(ctrl.filterMatchCount(), 2);
    });
  });

  describe('onClearSelection', () => {
    it('sets selectedTab to Annotations tab if selectedTab is null', () => {
      fakeStore.getState.returns({ selectTab: null });

      const elem = util.createDirective(document, 'searchStatusBar', {});
      const ctrl = elem.ctrl;
      ctrl.onClearSelection();

      assert.calledWith(fakeStore.selectTab, uiConstants.TAB_ANNOTATIONS);
    });

    it('sets selectedTab to Annotations tab if selectedTab is set to orphans', () => {
      fakeStore.getState.returns({ selectTab: uiConstants.TAB_ORPHANS });

      const elem = util.createDirective(document, 'searchStatusBar', {});
      const ctrl = elem.ctrl;
      ctrl.onClearSelection();

      assert.calledWith(fakeStore.selectTab, uiConstants.TAB_ANNOTATIONS);
    });

    it('clears selected annotations', () => {
      fakeStore.getState.returns({ selectTab: uiConstants.TAB_ORPHANS });

      const elem = util.createDirective(document, 'searchStatusBar', {});
      const ctrl = elem.ctrl;
      ctrl.onClearSelection();

      assert.calledOnce(fakeStore.clearSelectedAnnotations);
    });

    it('clears the directLinkedGroupFetchFailed state', () => {
      fakeStore.getState.returns({ selectTab: null });

      const elem = util.createDirective(document, 'searchStatusBar', {});
      const ctrl = elem.ctrl;
      ctrl.onClearSelection();

      assert.calledOnce(fakeStore.clearDirectLinkedGroupFetchFailed);
    });

    it('clears the direct linked IDs in the store', () => {
      fakeStore.getState.returns({ selectTab: null });

      const elem = util.createDirective(document, 'searchStatusBar', {});
      const ctrl = elem.ctrl;
      ctrl.onClearSelection();

      assert.calledOnce(fakeStore.clearDirectLinkedIds);
    });
  });

  describe('areAllAnnotationsVisible', () => {
    it('returns true if the direct-linked group fetch failed', () => {
      fakeStore.getState.returns({ directLinkedGroupFetchFailed: true });

      const elem = util.createDirective(document, 'searchStatusBar', {});
      const ctrl = elem.ctrl;

      assert.isTrue(ctrl.areAllAnnotationsVisible());
    });

    it('returns true if there are annotations selected', () => {
      fakeStore.getState.returns({
        directLinkedGroupFetchFailed: false,
        selectedAnnotationMap: { ann: true },
      });

      const elem = util.createDirective(document, 'searchStatusBar', {});
      const ctrl = elem.ctrl;

      assert.isTrue(ctrl.areAllAnnotationsVisible());
    });

    it('returns false if there are no annotations selected', () => {
      fakeStore.getState.returns({
        directLinkedGroupFetchFailed: false,
        selectedAnnotationMap: {},
      });

      const elem = util.createDirective(document, 'searchStatusBar', {});
      const ctrl = elem.ctrl;

      assert.isFalse(ctrl.areAllAnnotationsVisible());
    });

    it('returns false if the `selectedAnnotationMap` is null', () => {
      fakeStore.getState.returns({
        directLinkedGroupFetchFailed: false,
        selectedAnnotationMap: null,
      });

      const elem = util.createDirective(document, 'searchStatusBar', {});
      const ctrl = elem.ctrl;

      assert.isFalse(ctrl.areAllAnnotationsVisible());
    });
  });

  context('when there is a filter', () => {
    it('should display the filter count', () => {
      fakeRootThread.thread.returns({
        children: [
          {
            id: '1',
            visible: true,
            children: [{ id: '3', visible: true, children: [] }],
          },
          {
            id: '2',
            visible: false,
            children: [],
          },
        ],
      });

      const elem = util.createDirective(document, 'searchStatusBar', {
        filterActive: true,
      });
      assert.include(elem[0].textContent, '2 search results');
    });
  });

  context('when there is a selection', () => {
    it('should display the "Show all annotations (2)" message when there are 2 annotations', () => {
      const msg = 'Show all annotations';
      const msgCount = '(2)';
      fakeStore.getState.returns({
        selectedAnnotationMap: { ann1: true },
      });
      const elem = util.createDirective(document, 'searchStatusBar', {
        totalAnnotations: 2,
        selectedTab: 'annotation',
      });
      const clearBtn = elem[0].querySelector('button');
      assert.include(clearBtn.textContent, msg);
      assert.include(clearBtn.textContent, msgCount);
    });

    it('should display the "Show all notes (3)" message when there are 3 notes', () => {
      const msg = 'Show all notes';
      const msgCount = '(3)';
      fakeStore.getState.returns({
        selectedAnnotationMap: { ann1: true },
      });
      const elem = util.createDirective(document, 'searchStatusBar', {
        totalNotes: 3,
        selectedTab: 'note',
      });
      const clearBtn = elem[0].querySelector('button');
      assert.include(clearBtn.textContent, msg);
      assert.include(clearBtn.textContent, msgCount);
    });
  });
});
