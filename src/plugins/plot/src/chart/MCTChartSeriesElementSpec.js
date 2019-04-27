define([
    './MCTChartSeriesElement',
    '../configuration/PlotConfigurationModel',
    '../configuration/PlotSeries'
], function (MCTChartSeriesElement, PlotConfigurationModel, PlotSeries) {
    describe("MCTChartSeriesElement", function () {
        var mockOpenMCT;
        var mockComposition;
        var mockTimeAPI;
        var mockTimeSystem;
        var mockFormatSystem;
        var mockFormat;
        var chartSeriesElement;

        describe('makeInsertionPoint', function () {
            mockOpenMCT = jasmine.createSpyObj('openmct', [
                '$injector',
                'composition',
                'objects',
                'time',
                'telemetry'
            ]);
            mockComposition = jasmine.createSpyObj('composition', [
                'on',
                'off',
                'load'
            ]);
            mockOpenMCT.composition = jasmine.createSpyObj('composition', [
                'get',
                'on'
            ]);
            mockOpenMCT.composition.get.and.returnValue(mockComposition);
            mockOpenMCT.telemetry = jasmine.createSpyObj('telemetry', [
                'getMetadata',
                'getFormatMap'
            ]);
            mockOpenMCT.composition.get.and.returnValue(mockComposition);

            mockTelemetryMetaData = jasmine.createSpyObj('telemetryMetaData', [
                'valuesForHints'
            ]);
            mockTelemetryMetaData.valuesForHints.and.returnValue([{ key: 'a'}]);

            mockOpenMCT.telemetry.getMetadata.and.returnValue(mockTelemetryMetaData);


            mockFormatSystem = jasmine.createSpyObj('formatService', [
                'getFormat'
            ]);
            mockFormat = jasmine.createSpyObj('format', [
                'format'
            ]);
            mockFormatSystem.getFormat = jasmine.createSpy('get');
            mockFormatSystem.getFormat.and.returnValue(mockFormat);

            mockOpenMCT.$injector.get = jasmine.createSpy('get');
            mockOpenMCT.$injector.get.and.returnValue(mockFormatSystem);

            mockTimeAPI = jasmine.createSpyObj('time', [
              'bounds',
              'timeSystem'
            ]);

            mockTimeAPI.bounds = jasmine.createSpy('bounds');
            mockTimeAPI.bounds.and.returnValue({ start: 0, end: 1});

            mockTimeSystem = jasmine.createSpyObj('timeSystem', [
              'timeFormat'
            ]);
            mockTimeSystem.timeFormat = jasmine.createSpy('timeFormat');

            mockTimeAPI.timeSystem = jasmine.createSpy('timeSystem');
            mockTimeAPI.timeSystem.and.returnValue(mockTimeSystem);


            mockOpenMCT.time = mockTimeAPI;

            var domainObject = {};
            var seriesConfig = {};

            var plotConfigurationModel = new PlotConfigurationModel({
              openmct: mockOpenMCT,
              model: {
                domainObject: domainObject
              }
            });
            var seriesCollectionOptions = plotConfigurationModel.series;
            var seriesOptions = {
                model: seriesConfig,
                domainObject: domainObject,
                collection: plotConfigurationModel.series,
                openmct: plotConfigurationModel.openmct,
                persistedConfig: plotConfigurationModel
                    .getPersistedSeriesConfig(domainObject.identifier)
            };
            var series = new PlotSeries(seriesOptions);
            chartSeriesElement = new MCTChartSeriesElement(series, [], {});
            var point = {};
            var point2 = {};
            var point3 = {};
            var point4 = {};
            var point5 = {};
            chartSeriesElement.append(point, 0, 0);
            chartSeriesElement.append(point2, 0, 0);
            chartSeriesElement.append(point3, 0, 0);
            chartSeriesElement.append(point4, 0, 0);
            chartSeriesElement.reset();
            chartSeriesElement.append(point5, 0, 0);
        });
    });
});
