import React from 'react';
import { Box, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { styled } from '@mui/system';
import Button from '../components/button/button.component';

const FONT_FAMILY = 'Verdana, Arial, Helvetica, sans-serif';
const GRAY = 'rgb(100,100,100)';

const HeadingTypography = styled((props) => <Typography component='h2' {...props} />)({
  fontFamily: FONT_FAMILY,
  color: GRAY
});

const SubSectionHeadingTypography = styled((props) => <Typography component='h3' {...props} />)({
  fontFamily: FONT_FAMILY,
  fontWeight: 'bold',
  fontStyle: 'italic',
  fontSize: '12px',
  marginTop: '8px'
});

const TableHeadingTypography = styled((props) => <Typography component='h3' {...props} />)({
  fontFamily: FONT_FAMILY,
  fontSize: '12px'
});

const FigureHeadingTypography = styled((props) => <Typography component='h3' {...props} />)({
  fontFamily: FONT_FAMILY,
  fontSize: '12px',
  fontStyle: 'italic'
});

const ParagraphTypography = styled((props) => <Typography component='p' {...props} />)({
  fontFamily: FONT_FAMILY,
  fontSize: '13px',
  padding: '4px 12px'
});

const CaptionTypography = styled((props) => <Typography component='figcaption' {...props} />)({
  fontFamily: FONT_FAMILY,
  fontSize: '10px',
  fontStyle: 'italic',
  color: GRAY
});

const CitationTypography = styled((props) => <Typography component='p' {...props} />)({
  fontFamily: FONT_FAMILY,
  fontSize: '10px',
  padding: '4px 8px 8px 18px',
  textIndent: '-10px'
});




export const tabsInfo = [
  {
    "name": "User Guide",
    "contentType": "normal",
    "content": 
      <Box key='user-guide' sx={{ padding: '8px' }}>
        <HeadingTypography>Choosing Options</HeadingTypography>

        <ParagraphTypography>The map will automatically update after any option is changed.</ParagraphTypography>
        <ParagraphTypography><b>Select By:</b> Changes the selectable areas on the map. If you have a location selected and change this option the tool will automatically determine the new area that should be selected based on the pin location.</ParagraphTypography>
        <ParagraphTypography><b>Emission Scenario:</b> Changes the projection between low emission future (Representative Concentration Pathway 4.5) and high emission future (Representative Concentration Pathway 8.5).</ParagraphTypography>
        <ParagraphTypography><b>Time Period:</b> Changes the projection time period.</ParagraphTypography>
        <ParagraphTypography><b>Annual Exceedance Probability:</b> Changes the probability of exceedance.</ParagraphTypography>

        <HeadingTypography>Changing Tabs</HeadingTypography>

        <ParagraphTypography>Clicking on the tabs above will change the content displayed in this box.</ParagraphTypography>
        <ParagraphTypography><b>User Guide:</b> Displays the current content.</ParagraphTypography>
        <ParagraphTypography><b>IDF Curve:</b> After selecting a location on the map this tab displays the IDF curve chart as well as a table of the data displayed in the chart.</ParagraphTypography>
        <ParagraphTypography><b>About the Data:</b> A description of the data source.</ParagraphTypography>

        <HeadingTypography>Selecting Location</HeadingTypography>

        <ParagraphTypography>Click on the map within a colored region at your desired location. The selected area will be highlighted by an orange border and the map will zoom and/or pan to the selected location. A 'Reset Zoom' button will appear to allow you to return to the original view.</ParagraphTypography>
        <ParagraphTypography>The tab will automatically change to 'IDF Curve' and will display the IDF curve chart for the area that you selected.</ParagraphTypography>
        <ParagraphTypography>A new table will populate at the bottom of the map and dislay the change factors for the area that you selected.</ParagraphTypography>

        <HeadingTypography>Adding Confidence Intervals to the Chart</HeadingTypography>
        
        <ParagraphTypography>Hovering your cursor over any of the confidence interval toggles will display what each toggle is for. Clicking on a toggle will add or remove that confidence interval in the chart and data table. Only the intervals that are turned on will be included in your file downloads.</ParagraphTypography>

        <HeadingTypography>Downloading Data/Chart</HeadingTypography>

        <ParagraphTypography> Once you have selected a location, go to the 'IDF Curve' tab. Here you will find the download buttons below the chart and left of the confidence interval toggles.</ParagraphTypography>
        <ParagraphTypography><b>On a large screen:</b> Simply click button for the desired file type to download it.</ParagraphTypography>
        <ParagraphTypography><b>On a small screen:</b> Click the button with the download icon, then click the button for the desired file type to download it.</ParagraphTypography>
        <ParagraphTypography><b>NOTE:</b> The 'Excel' file will contain data in a table, but will not include the IDF curve chart. The 'PDF' file will contain both the data and the IDF curve chart.</ParagraphTypography>
      </Box>
  },
  {
    "name": "IDF Curve",
    "contentType": "component",
    "content": "highchart"
  },
  {
    "name": "About the Data",
    "contentType": "normal",
    "content": 
      <Box key='about-the-data' sx={{ padding: '8px' }}>
        <HeadingTypography>About the Data</HeadingTypography>

        <ParagraphTypography>The historical and future downscaled atmosphere–ocean general circulation model (AOGCM) and Earth System model (ESM) output used in this study was obtained from two sources 1) North American Coordinated Regional Downscaling Experiment (NA-CORDEX) (Mearns et al., 2017) and 2) Localized Constructed Analog (LOCA) (Pierce et al., 2014). Simulations from the models’ historical period and two future Representative Concentration Pathways (RCP4.5 and RCP 8.5) (Collins et al. 2013) were used. Table 1 highlights the unique features of each of these datasets. For example, LOCA downscaling provides one of the highest resolution outputs, while NA-CORDEX, the only dynamically downscaled dataset selected for this study, has a much coarser spatial resolution. Since the downscaling approach, choice of global climate model (GCM) and RCP, and spatial and temporal resolution each introduce their own source of uncertainty, it is important to consider a range of these features to capture the plausible range of future precipitation extremes. Two other downscaled data sets were considered, Bias Corrected Constructed Analogue (BCCAv2) (Maraun et al., 2010) and Multivariate Adaptive Constructed Analogs (MACA) (Abatzoglou and Brown, 2012) but were excluded from the study based on the results of Lopez-Cantu et al. (2020).</ParagraphTypography>
        
        <figure style={{ margin: 'auto 25px' }}>
          <TableHeadingTypography><b>Table 1.</b> Characteristics of downscaled climate model datasets used in this study</TableHeadingTypography>
          <div></div>
          <img src={`${process.env.PUBLIC_URL}/assets/table1.png`} alt='Table describing characteristics of downscaled climate model datasets used in this study' style={{ width: '100%' }} />
          <CaptionTypography>*Gridded spatial resolutions across all datasets are approximate and based on conversions from degrees to kilometers at mid-latitudes.</CaptionTypography>
        </figure>

        <ParagraphTypography>The LOCA dataset is widely used, as it forms the basis for downscaling in the current National Climate Assessment (USGCRP, 2018). Projections from the 31 GCMs summarized in Table 2, downscaled to a spatial resolution of 0.0625° (approximately 6 km or the distance from Philadelphia to Camden), provide the foundation for the LOCA dataset. The LOCA data cover a 1950-2005 historical period and projections for the 2006-2099 future period using RCP4.5 and RCP8.5. Details regarding the statistical downscaling methodology used in LOCA can be found in (Pierce et al., 2014). Briefly, the method begins by matching the spatial pattern of the variable of interest from a future GCM projection to that based on historical observations over a region. From a pool of candidate observed historical analog days the single best candidate, based on minimization of root mean square error, is chosen as an analog, unless a different analog day is selected for neighboring grid cells, in which case a weighted combination of the observed analog days is used. In either case, high-resolution observed data corresponding to the historical analog day is used to represent the downscaled future rainfall.</ParagraphTypography>
        <ParagraphTypography>NA-CORDEX, on the other hand, employs a dynamical downscaling approach based on a set of regional climate models (RCM) with boundary conditions specified by GCM simulations from the CMIP5 archive. The RCM domain is limited to the area covering the majority of North America. Like LOCA, historical and future simulations are available for the period 1950-2100, using both RCP8.5 and RCP4.5. Most simulations are available with a spatial resolution of 0.22° (approximately 25 km or half the distance from Philadelphia to Trenton), however a subset of RCP4.5 simulations are only available at a 0.44° (50 km) resolution (the full distance from Philadelphia to Trenton). Table 3 summarizes the NA-CORDEX simulations used.</ParagraphTypography>

        <figure style={{ margin: 'auto 25px' }}>
          <TableHeadingTypography><b>Table 2.</b> List of CMIP5 models used in LOCA downscaling</TableHeadingTypography>
          <img src={`${process.env.PUBLIC_URL}/assets/table2.png`} alt='Table describing CMIP5 models used in this study' style={{ width: '100%' }} />
        </figure>

        <figure style={{ margin: 'auto 25px' }}>
          <TableHeadingTypography><b>Table 3.</b> NA-CORDEX simulations used in this study</TableHeadingTypography>
          <img src={`${process.env.PUBLIC_URL}/assets/table3.png`} alt='Table describing NA-CORDEX simulations used in this study' style={{ width: '100%' }} />
        </figure>

        <ParagraphTypography>Once the relevant data sets were downloaded, data processing proceeded according to the steps described below and outlined in Figure 1.</ParagraphTypography>

        <figure style={{ margin: 'auto 25px' }}>
          <img src={`${process.env.PUBLIC_URL}/assets/figure1.png`} alt='Figure describing workflow used in analysis' style={{ width: '100%' }} />
          <FigureHeadingTypography><b>Figure 1.</b> Workflow to analyze gridded downscaled climate projections and estimate change factors at the county scale for the study area. The same workflow was repeated for each future period and RCP scenario.</FigureHeadingTypography>
        </figure>

        <SubSectionHeadingTypography>i. Extreme value analysis</SubSectionHeadingTypography>
        <ParagraphTypography>The n largest independent precipitation events are extracted separately from each downscaled data set and model, where n represents the number of available years of record. These values are known as a partial duration series (PDS). Thus, two events can be selected from the same year, provided they do not occur within seven days of each other. This 7-day period is chosen to assure the independence between the events. PDS are used as the basis of this work, given this method’s widespread application (e.g. Cook et al., 2017; DeGaetano and Castellano 2017; Lopez‐Cantu et al., 2020; Ragno et al. 2018; Thakali et al., 2016; Wu et al. 2019) and to ensure the inclusion of all relevant extreme rainfall events projected in the downscaled climate simulations.</ParagraphTypography>
        <ParagraphTypography>A PDS was compiled for each grid cell, corresponding to the 50-year period from 1950- 1999. This period was designated the historical period as it corresponds to each downscaled model’s historical simulation period. Likewise, this time-period corresponds to the longest available overlap period between the downscaled simulations and stations included in NOAA Atlas 14. PDS for two future time periods 2020-2069 and 2050-2099 were also extracted. The 50-year length was selected to assure an adequate sample size for extreme value analysis, and to minimize the influence of the non-stationarity of the record and the potential effect of natural interdecadal variations in the extreme rainfall record (DeGaetano and Castellano, 2017). Separate PDS were also compiled for simulations using RCP8.5 and RCP4.5.</ParagraphTypography>
        <ParagraphTypography>For each PDS, rainfall amounts corresponding to recurrence probabilities of 50%, 20%, 10%, 4%, 2% and 1% (i.e. 2-, 5-, 10- 25-, 50- and 100-year storms) were computed by simulating the methodology used in NOAA Atlas 14 (Bonnin et al., 2006; Perica et al., 2019). First, the python lmoments package (<a href='https://pypi.org/project/lmoments/' target='_blank' rel='noreferrer'>https://pypi.org/project/lmoments/</a>) was used to fit the generalized extreme value (GEV) distribution to each grid point’s PDS using the methods of Hosking (1990). Although not the only valid theoretical distribution for estimating extreme rainfall probabilities, the use of the GEV has been standard practice in prior extreme rainfall analyses (e.g. Papalexiou and Koutsoyiannis, 2013). Given the L-moments estimates for the GEV parameters, the lmoments library quagev method was used to obtain the specified quantiles of the GEV distribution.</ParagraphTypography>
        <ParagraphTypography>In addition, the regional L-moments procedure used in NOAA Atlas 14 Volume 10 (Perica et al., 2019) was adapted. Although the majority of sites lied outside the region covered by this atlas, the methodology employed to develop regions in the later atlas was an improvement over the earlier implementation as it defined regions relative to each station rather than a small set of broad regions and corrected an error in the procedure used to define confidence intervals. For each grid point, the 20 closest neighboring grids points, were identified. Sample lmoments were obtained for each of these points using the lmoments library samlmu routine and an average of the higher order moments computed. These averages along with the base grid’s location parameter (i.e. mean) were then used to obtain GEV parameters and quantiles.</ParagraphTypography>
        
        <SubSectionHeadingTypography>ii. Change factor definition</SubSectionHeadingTypography>
        <ParagraphTypography>As outlined in Figure 2, the development of 2-, 5-, 10-, 25-, 50- and 100-year recurrence interval precipitation amounts using L-moments fitting of the GEV distribution is the second of a five-part workflow. In the third step an ensemble of change-factors were computed for each gridpoint-model-RCP combination. Change-factors (CF) are defined as:</ParagraphTypography>
        
        <Box sx={{ fontFamily: FONT_FAMILY, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px', marginBottom: '8px' }}>
          <Box><b>CF</b><sub>i</sub>=</Box>
          <Box>
            <Box><b>P</b><sub>i,r,future</sub></Box>
            <Box sx={{ backgroundColor: 'black', height: '1px', width: '100%' }} />
            <Box><b>P</b><sub>r,historical</sub></Box>
          </Box>
        </Box>
        
        <ParagraphTypography>Where <i>P</i> is the precipitation associated with <i>i</i><sup>th</sup> ensemble member for the <i>r</i><sup>th</sup> recurrence interval computed for either one of the two <i>future</i> periods (2020-2069 or 2050-2099) or the 1950-1999 <i>historical</i> period. Ultimately the CFs computed using values obtained from single station versus regional L-moments fitting were similar. The regional approach, however, was adopted to simulate the Atlas 14 methodology and since these values tended to be less variable from point to point.</ParagraphTypography>
        <ParagraphTypography>For each grid-model-RCP combination an ensemble (<i>i</i>) of 1000 simulations was also constructed via a resampling procedure. From the GEV distribution fit to the original downscaled future period PDS, 1000 50-member PDS were randomly selected using the scipy genextreme rvs function. A new GEV distribution was fit to each random PDS, retaining the original regional average of the higher order moments, and the resulting 2-, 5-, 10-, 25-, 50- and 100-year recurrence interval precipitation amounts used to compute 1000 random CF.</ParagraphTypography>
        
        <SubSectionHeadingTypography>iii. Spatial interpolation and smoothing</SubSectionHeadingTypography>
        <ParagraphTypography>Next, the CF values were interpolated to a common 0.1° grid to allow the results from the different downscaling methods to be combined. The scipy.interpolate griddata function was used to perform nearest neighbor interpolation. Finally, to smooth the spatial variations which often existed between neighboring grid points a 3-point uniform smoothing (i.e. the average of the grid and its two closest neighbors in each direction) was applied using the sci ndimage uniform_filter function. The interpolate griddata function was also used to interpolate the CF from the 0.1 grid to county centroids. Given the lack of spatial variation in CF, the county-level values obtained via this approach were not substantially different from those that would have resulted if a weighted average of grids encompassing a county were used.</ParagraphTypography>
        
        <SubSectionHeadingTypography>iv. Quantification of uncertainty</SubSectionHeadingTypography>
        <ParagraphTypography>In the final step, the uncertainty of the CFs was quantified. At each 0.1° grid point an ensemble of 47,000 CFs was available for each recurrence interval under RCP8.5 (47 models; 31 LOCA and 16 CORDEX x 1000 resamples) and 40,000 CFs existed under RCP4.5. From this ensemble the median CF factor was obtained as were the 17th, 25th, 75th and 83rd percentiles. The 17th and 83rd percentiles were selected to represent a likely range (Mastrandrea et al. 2010) of projections around the median.</ParagraphTypography>

        <HeadingTypography>Download</HeadingTypography>

        <a
          href={`${process.env.PUBLIC_URL}/assets/projected-changes-rainfall-model.pdf`}
          download='projected-changes-rainfall-model'
          target='_blank' rel='noreferrer'
          style={{
            textDecoration: 'none'
          }}
        >
          <Button buttonType='textPdf'>
            <InsertChartIcon />
            Full Report PDF (22.3MB)
          </Button>
        </a>

        <HeadingTypography>References</HeadingTypography>

        <CitationTypography>
          Abatzoglou J.T. and Brown T.J. 2012.
          “A comparison of statistical downscaling methods suited for wildfire applications”.
          <i>International Journal of Climatology</i>, 32, 772-780.
          <a href='http://onlinelibrary.wiley.com/doi/10.1002/joc.2312/full' target='_blank' rel='noreferrer'>http://onlinelibrary.wiley.com/doi/10.1002/joc.2312/full</a>
        </CitationTypography>

        <CitationTypography>
          Bonnin, G.M., Martin, D., Lin, B., <i>et al.</i> 2006.
          NOAA Atlas 14: Precipitation-Frequency Atlas of the United States, volume 2, Version 3.0.
          <a href='ftp://ftp.library.noaa.gov/noaa_documents.lib/NWS/NOAA_Atlas/NOAA_Atlas_14/Atlas14 _V olume2.pdf' target='_blank' rel='noreferrer'>ftp://ftp.library.noaa.gov/noaa_documents.lib/NWS/NOAA_Atlas/NOAA_Atlas_14/Atlas14 _V olume2.pdf</a>
        </CitationTypography>

        <CitationTypography>
          Collins, M., <i>et al.</i> (2013)
          Section 12.3.1.3 The New Concentration Driven RCP Scenarios, and their Extensions,
          in: Chapter 12: Long-term Climate Change: Projections, Commitments and Irreversibility (archived 16 July 2014),
          in: IPCC AR5 WG1 2013, pp. 1045-1047
        </CitationTypography>

        <CitationTypography>
          Cook, L.M., C.J. Anderson, and C. Samaras. 2017.
          “Framework for Incorporating Downscaled Climate Output into Existing Engineering Methods: Application to Precipitation Frequency Curves.”
          Journal of Infrastructure Systems 23 (4): 04017027.
          <a href='https://doi.org/10.1061/(ASCE)IS.1943-555X.0000382.' target='_blank' rel='noreferrer'>https://doi.org/10.1061/(ASCE)IS.1943-555X.0000382</a>.
        </CitationTypography>
        
        <CitationTypography>
          DeGaetano, Arthur T., and C. M. Castellano. 2017.
          “Future Projections of Extreme Precipitation Intensity-Duration-Frequency Curves for Climate Adaptation Planning in New York State.”
          Climate Services 5 (January): 23–35.
          <a href="https://doi.org/10.1016/j.cliser.2017.03.003" target='_blank' rel='noreferrer'>https://doi.org/10.1016/j.cliser.2017.03.003</a>.
        </CitationTypography>

        <CitationTypography>
          Hernández-Díaz, L., Nikiéma, O., Laprise, R., Winger, K., & Dandoy, S. 2019.
          Effect of empirical correction of sea-surface temperature biases on the CRCM5-simulated climate and projected climate changes over North America.
          <i>Climate Dynamics</i>,  53(1–2),  453– 476.
        </CitationTypography>

        <CitationTypography>
          Hosking, J. 1990.
          L-Moments: Analysis and Estimation of Distributions Using Linear Combinations of Order Statistics.
          Journal of the Royal Statistical Society. Series B (Methodological),52(1), 105-124.
        </CitationTypography>
        
        <CitationTypography>
          López‐Cantú, T., Prein, A.F. and Samaras, C., 2020.
          Uncertainties in future US extreme precipitation from downscaled climate projections.
          Geophysical Research Letters, 47(9), p.e2019GL086797.
        </CitationTypography>
        
        <CitationTypography>
          Maraun, D., Wetterhall, F., Ireson, A.M., Chandler, R.E., Kendon, E.J., Widmann, M., Brienen, S., Rust, H.W., Sauter, T., Themeßl, M. and Venema, V.K.C., 2010.
          Precipitation downscaling under climate change: Recent developments to bridge the gap between dynamical models and the end user.
          <i>Reviews of geophysics</i>, 48(3).
          <a href="https://doi.org/10.1029/2009RG000314" target='_blank' rel='noreferrer'>https://doi.org/10.1029/2009RG000314</a>.
        </CitationTypography>
        
        <CitationTypography>
          Mastrandrea, M.D., C.B. Field, T.F. Stocker, O. Edenhofer, K.L. Ebi, D.J. Frame, H. Held, E. Kriegler, K.J. Mach, P.R. Matschoss, G.-K. Plattner, G.W. Yohe, and F.W. Zwiers, 2010:
          <i>Guidance Note for Lead Authors of the IPCC Fifth Assessment Report on Consistent Treatment of Uncertainties</i>.
          Intergovernmental Panel on Climate Change (IPCC).
          Available at <a href="http://www.ipcc.ch" target='_blank' rel='noreferrer'>http://www.ipcc.ch</a>.
        </CitationTypography>
        
        <CitationTypography>
          Mearns, L.O., et al. 2017.
          “The NA-CORDEX dataset, version 1.0.”
          NCAR Climate Data Gateway, Boulder CO,
          <a href="https://doi.org/10.5065/D6SJ1JCH" target='_blank' rel='noreferrer'>https://doi.org/10.5065/D6SJ1JCH</a>
        </CitationTypography>
        
        <CitationTypography>
          Papalexiou, S.M. and Koutsoyiannis, D., 2013.
          Battle of extreme value distributions: A global survey on extreme daily rainfall.
          Water Resources Research, 49(1), pp.187-201.
        </CitationTypography>
        
        <CitationTypography>
          Perica, S., Pavlovic, S., St Laurent, M., Trypaluk, C., Unruh, D., Martin, D. and Wilhite, O., 2019.
          Precipitation-Frequency Atlas of the United States. Volume 10, Version 3.0.
          Northern States; Connecticut, Maine, Massachusetts, New Hampshire, New York, Rhode Island, Vermont.
        </CitationTypography>
        
        <CitationTypography>
          Pierce, D.W., Cayan, D.R. and B.L. Thrasher. 2014.
          “Statistical downscaling using Localized Constructed Analogs (LOCA).”
          Journal of Hydrometeorology, volume 15, page 2558-2585.
          <a href="http://journals.ametsoc.org/doi/abs/10.1175/JHM-D-14-0082.1 target='_blank' rel='noreferrer'">http://journals.ametsoc.org/doi/abs/10.1175/JHM-D-14-0082.1</a>.
        </CitationTypography>
        
        <CitationTypography>
          Ragno, E., A. AghaKouchak, C.A. Love, L. Cheng, F. Vahedifard, and C. HR Lima. 2018.
          “Quantifying Changes in Future Intensity-Duration-Frequency Curves Using Multimodel Ensemble Simulations.”
          Water Resources Research 54 (3): 1751–64.
        </CitationTypography>
        
        <CitationTypography>
          Thakali, R., A. Kalra, and S. Ahmad. 2016.
          “Understanding the Effects of Climate Change on Urban Stormwater Infrastructures in the Las Vegas Valley.”
          Hydrology 3 (4): 34.
          <a href="https://doi.org/10.3390/hydrology3040034" target='_blank' rel='noreferrer'>https://doi.org/10.3390/hydrology3040034</a>.
        </CitationTypography>
        
        <CitationTypography>
          USGCRP, 2018:
          <i>Impacts, Risks, and Adaptation in the United States: Fourth National Climate Assessment, Volume II</i>
        </CitationTypography>

        <CitationTypography>
          Wu, S., Markus, M., Lorenz, D., Angel, J.R. and Grady, K., 2019.
          “A Comparative Analysis of the Historical Accuracy of the Point Precipitation Frequency Estimates of Four Data Sets and Their Projections for the Northeastern United States.”
          Water 11 (6): 1279.
          <a href="https://doi.org/10.3390/w11061279" target='_blank' rel='noreferrer'>https://doi.org/10.3390/w11061279</a>.
        </CitationTypography>
      </ Box>
  }
]
